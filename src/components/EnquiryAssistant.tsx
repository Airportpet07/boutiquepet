import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Copy, Loader2, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { draftEnquiry } from "@/lib/enquiry.functions";

const empty = { ownerName: "", contact: "", petName: "", breed: "", age: "", temperament: "", careNeeds: "", checkIn: "", checkOut: "" };

export function EnquiryAssistant() {
  const draft = useServerFn(draftEnquiry);
  const [form, setForm] = useState(empty);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.checkOut < form.checkIn) { setError("Check-out must be after check-in."); return; }
    setLoading(true); setError(""); setResult("");
    try {
      const res = await draft({ data: form });
      if (res.error) setError(res.error); else setResult(res.text);
    } catch {
      setError("Please check the details and try again.");
    } finally { setLoading(false); }
  }

  const subject = result.match(/^Subject:\s*(.+)$/m)?.[1] ?? `Boarding enquiry for ${form.petName}`;
  const body = result.replace(/^Subject:.*\n+/m, "");

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" id="ownerName"><Input id="ownerName" required maxLength={100} value={form.ownerName} onChange={set("ownerName")} /></Field>
          <Field label="Phone or email" id="contact"><Input id="contact" maxLength={150} value={form.contact} onChange={set("contact")} /></Field>
          <Field label="Pet's name" id="petName"><Input id="petName" required maxLength={60} value={form.petName} onChange={set("petName")} /></Field>
          <Field label="Breed / size" id="breed"><Input id="breed" maxLength={100} value={form.breed} onChange={set("breed")} placeholder="e.g. Small Cavoodle" /></Field>
          <Field label="Check-in" id="checkIn"><Input id="checkIn" type="date" required value={form.checkIn} onChange={set("checkIn")} /></Field>
          <Field label="Check-out" id="checkOut"><Input id="checkOut" type="date" required value={form.checkOut} onChange={set("checkOut")} /></Field>
        </div>
        <Field label="Age" id="age"><Input id="age" maxLength={40} value={form.age} onChange={set("age")} placeholder="e.g. 3 years" /></Field>
        <Field label="Temperament" id="temperament"><Textarea id="temperament" required maxLength={1200} rows={3} value={form.temperament} onChange={set("temperament")} placeholder="Friendly with other dogs, a little shy at first, loves cuddles…" /></Field>
        <Field label="Care needs" id="careNeeds"><Textarea id="careNeeds" maxLength={1500} rows={3} value={form.careNeeds} onChange={set("careNeeds")} placeholder="Feeding times, medication, allergies, favourite toy…" /></Field>
        <Button type="submit" size="lg" disabled={loading} className="justify-self-start rounded-none">
          {loading ? <><Loader2 className="animate-spin" /> Writing your enquiry…</> : <><Sparkles /> Draft my enquiry</>}
        </Button>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </form>
      <div className="flex flex-col border border-border bg-background p-6">
        <p className="eyebrow mb-4">Your enquiry</p>
        {result ? (
          <>
            <Textarea aria-label="Drafted enquiry" value={result} onChange={(e) => setResult(e.target.value)} rows={16} className="flex-1 resize-y leading-relaxed" />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-none" onClick={async () => { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }}><Copy /> {copied ? "Copied" : "Copy"}</Button>
              <Button asChild variant="outline" className="rounded-none"><a href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}><Mail /> Open in email</a></Button>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground leading-relaxed">Tell us about your pet and your dates, and we'll write a clear, personal enquiry you can edit, copy, or send.</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return <div className="grid gap-2"><Label htmlFor={id}>{label}</Label>{children}</div>;
}
