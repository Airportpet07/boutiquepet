import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Instagram, MapPin, Play, Quote } from "lucide-react";
import { EnquiryAssistant } from "@/components/EnquiryAssistant";
import { Button } from "@/components/ui/button";
import logo from "@/assets/boutique-logo.png.asset.json";
import welcome from "@/assets/boutique-welcome.webp.asset.json";
import dogs from "@/assets/boutique-dogs.webp.asset.json";
import garden from "@/assets/dog-garden.webp.asset.json";
import cavalier from "@/assets/dog-cavalier.webp.asset.json";
import outdoors from "@/assets/dogs-outdoors.webp.asset.json";
import sofa from "@/assets/dog-sofa.webp.asset.json";
import bench from "@/assets/dog-bench.webp.asset.json";
import relaxing from "@/assets/dog-relaxing.webp.asset.json";
import dachshund from "@/assets/dog-dachshund.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxury Dog Boarding in Perth - Boutique Pet Boarding" },
      { name: "description", content: "Experience premium care and comfort for your beloved dog at Boutique Pet Boarding. Our luxury facilities ensure a safe and joyful stay tailored to your pet's needs." },
      { property: "og:title", content: "Luxury Dog Boarding in Perth - Boutique Pet Boarding" },
      { property: "og:description", content: "A closer look at Boutique Pet Boarding, with customer reviews and directions to our Perth Airport location." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const videos = ["pRzRGvQveZ8", "unqOCzqnSDo"];
const gallery = [
  { asset: dogs, alt: "Two white dogs enjoying their stay indoors" },
  { asset: garden, alt: "Black dog relaxing on the lawn with a turquoise toy" },
  { asset: cavalier, alt: "Cavalier resting on the grass with a yellow toy" },
  { asset: outdoors, alt: "Two white dogs relaxing together outdoors" },
  { asset: sofa, alt: "A shaggy brown dog resting on a sofa" },
  { asset: bench, alt: "White dog sitting on a garden bench" },
  { asset: relaxing, alt: "Dachshund enjoying a belly-up rest" },
  { asset: dachshund, alt: "Dachshund looking up at the camera" },
];
const reviews = [
  { name: "Nica", text: "Boutique pet boarding spoiled Coco - thank you Boutique for giving my boy the best time! Love, love love. Highly recommend!" },
  { name: "Mea", text: "I have been impressed with the premium service and the loving environment at Boutique Pet Boarding. My pup has been here many times and looks forward to his time here! Lovely homestay environment!" },
];
const instagram = "https://www.instagram.com/boutique_pet07";
const directions = "https://www.google.com/maps/dir//Boutique+Pet+Boarding,+32+Boud+Ave,+Perth+Airport+WA+6105/@-31.965184,115.8643712,11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2a32b9497195801b:0x46501b466831e3f6!2m2!1d115.9544927!2d-31.9378512?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D";

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="page-width flex flex-wrap items-center justify-between gap-5 py-6">
          <a href="#top" aria-label="Boutique Pet Boarding home" className="flex items-center gap-3 text-primary">
            <img src={logo.url} alt="Boutique Pet Boarding" className="h-auto w-[230px] sm:w-[280px]" />
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm sm:gap-8">
            <a className="nav-link" href="#gallery">Gallery</a>
            <a className="nav-link" href="#videos">Videos</a>
            <a className="nav-link" href="#reviews">Reviews</a>
            <a className="nav-link" href="#enquire">Enquire</a>
            <a className="nav-link" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram @boutique_pet07"><Instagram className="size-5" /></a>
            <Button asChild variant="outline" className="rounded-none"><a href="#location">Find us <MapPin /></a></Button>
          </nav>
        </div>
      </header>
      <main id="top">
        <section className="welcome-hero relative isolate flex items-center overflow-hidden">
          <img src={welcome.url} alt="Boutique Pet Boarding illustration of a welcoming host and dogs beside a swimming pool" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" fetchPriority="high" />
          <div className="hero-shade absolute inset-0 -z-10" />
          <div className="page-width py-16 text-primary-foreground">
            <p className="mb-5 text-sm font-semibold uppercase">Perth Airport · Western Australia</p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-6xl">Boutique Pet Boarding</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed">Experience premium care and comfort for your beloved dog at Boutique Pet Boarding. Our luxury facilities ensure a safe and joyful stay tailored to your pet's needs. Book now to give your dog a five-star boarding experience.</p>
            <Button asChild size="lg" className="mt-8"><a href="tel:0459668132">Call 0459 668 132 <ArrowUpRight /></a></Button>
          </div>
        </section>
        <section id="videos" className="page-width pb-16 pt-12 sm:pb-20 sm:pt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
            <div>
              <p className="eyebrow mb-4">Perth Airport · Western Australia</p>
              <h2 className="brand-type max-w-3xl text-4xl leading-[1.12] text-primary sm:text-5xl">Life at Boutique</h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">Discover the unparalleled comfort and care at Boutique Pet Boarding, Perth's premier luxury dog boarding service. Watch to see how we pamper your pets in a safe, loving environment. Your dog's happiness and well-being are our top priorities.</p>
            </div>
            <Button asChild variant="link" className="h-auto px-0"><a href="#reviews">Words from our pet families <ArrowDown /></a></Button>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            {videos.map((id, index) => (
              <article key={id}>
                <div className="aspect-video overflow-hidden bg-muted">
                  <iframe className="h-full w-full border-0" src={`https://www.youtube-nocookie.com/embed/${id}`} title={`Boutique Pet Boarding video ${index + 1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-b border-border pb-4">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground"><Play className="size-3.5 text-primary" /> {index === 0 ? "Boutique Intro" : "Boutique Song"}</span>
                  <Button variant="link" asChild className="h-auto px-0 text-xs"><a href={`https://youtu.be/${id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowUpRight /></a></Button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="gallery" className="page-width pb-14 sm:pb-20">
          <h2 className="brand-type mb-8 text-3xl text-primary sm:text-4xl">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map(({asset, alt}) => <img key={asset.url} src={asset.url} alt={alt} className="aspect-[3/4] w-full object-cover" loading="lazy" />)}
          </div>
        </section>
        <section id="reviews" className="bg-secondary py-14 sm:py-20">
          <div className="page-width">
            <div className="mb-9 flex items-center gap-4"><span className="h-px w-10 bg-primary" /><p className="eyebrow">Kind words</p></div>
            <h2 className="brand-type mb-10 text-3xl text-primary sm:text-4xl">Loved by pets. Trusted by their people.</h2>
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              {reviews.map((review) => (
                <figure key={review.name} className="border-t border-border pt-6">
                  <Quote className="mb-5 size-7 text-primary" strokeWidth={1.3} aria-hidden="true" />
                  <blockquote className="text-lg leading-relaxed sm:text-xl">“{review.text}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 text-sm font-semibold"><span className="h-px w-6 bg-primary" />{review.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        <section id="enquire" className="page-width py-14 sm:py-20">
          <p className="eyebrow mb-4">Booking enquiry</p>
          <h2 className="brand-type mb-10 text-3xl text-primary sm:text-4xl">Tell us about your pet.</h2>
          <EnquiryAssistant />
        </section>
        <section id="location" className="page-width grid gap-8 py-14 sm:py-20 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div className="self-center">
            <p className="eyebrow mb-4">Find us</p>
            <h2 className="brand-type text-3xl text-primary sm:text-4xl">See you at Boutique.</h2>
            <address className="my-6 flex gap-3 not-italic leading-relaxed text-muted-foreground"><MapPin className="mt-1 size-5 shrink-0 text-primary" /><span>32 Boud Ave<br />Perth Airport WA 6105<br />Western Australia</span></address>
            <Button asChild size="lg" className="rounded-none"><a href={directions} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight /></a></Button>
          </div>
          <iframe title="Boutique Pet Boarding location at 32 Boud Ave, Perth Airport" className="h-[330px] w-full border-0 bg-muted sm:h-[360px]" src="https://maps.google.com/maps?q=Boutique%20Pet%20Boarding%2C%2032%20Boud%20Ave%2C%20Perth%20Airport%20WA%206105&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </section>
      </main>
      <footer className="border-t border-border bg-secondary">
        <div className="page-width flex flex-wrap items-center justify-between gap-4 py-7 text-sm text-muted-foreground"><span className="brand-type text-xl text-primary">Boutique Pet Boarding</span><a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Instagram className="size-4" /> @boutique_pet07</a><span>Perth Airport, Western Australia</span></div>
      </footer>
    </div>
  );
}
