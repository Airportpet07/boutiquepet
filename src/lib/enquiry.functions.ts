import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  ownerName: z.string().trim().min(1).max(100),
  contact: z.string().trim().max(150).default(""),
  petName: z.string().trim().min(1).max(60),
  breed: z.string().trim().max(100).default(""),
  age: z.string().trim().max(40).default(""),
  temperament: z.string().trim().min(1).max(1200),
  careNeeds: z.string().trim().max(1500).default(""),
  checkIn: z.string().trim().min(1).max(20),
  checkOut: z.string().trim().min(1).max(20),
});

export const draftEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { text: "", error: "The enquiry helper isn't configured yet." };

    const details = [
      `Owner: ${data.ownerName}`,
      data.contact && `Owner contact: ${data.contact}`,
      `Pet: ${data.petName}`,
      data.breed && `Breed/size: ${data.breed}`,
      data.age && `Age: ${data.age}`,
      `Temperament: ${data.temperament}`,
      data.careNeeds && `Care needs: ${data.careNeeds}`,
      `Check-in: ${data.checkIn}`,
      `Check-out: ${data.checkOut}`,
    ].filter(Boolean).join("\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        instructions:
          "You write booking enquiry emails from a pet owner to Boutique Pet Boarding, a luxury home-style dog boarding service in Perth, Western Australia. Write in the owner's first-person voice, warm and clear, Australian English. Include a short subject line first ('Subject: ...'), a greeting, the requested dates, a concise description of the pet's temperament, any care needs as a short bulleted list, a polite request to confirm availability and pricing, and a sign-off with the owner's name and contact. Use only the details provided; never invent facts. Under 220 words. Plain text only, no markdown headings.",
        input: details,
      }),
    });

    if (!res.ok || !res.body) {
      console.error("AI gateway error", res.status, await res.text().catch(() => ""));
      if (res.status === 429) return { text: "", error: "We're a little busy right now — please try again in a minute." };
      if (res.status === 402 || res.status === 403) return { text: "", error: "The enquiry helper is temporarily unavailable." };
      return { text: "", error: "Couldn't draft your enquiry. Please try again." };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === "response.output_text.delta") text += evt.delta ?? "";
        } catch {
          // ignore partial frames
        }
      }
    }
    if (!text.trim()) return { text: "", error: "Couldn't draft your enquiry. Please try again." };
    return { text: text.trim(), error: null as string | null };
  });
