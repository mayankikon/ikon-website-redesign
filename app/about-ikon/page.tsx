import { ArrowButton } from "@/components/ArrowButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Ikon" };

const commitments = [
  {
    title: "Our mission",
    body: "Give stores one program for lot operations, protection, F&I, and retention so the relationship with the customer stays at the dealership.",
  },
  {
    title: "Our vision",
    body: "An Ikonic dealership: sales velocity, insulated F&I gross, and service bays at capacity — on autopilot, not on four vendors.",
  },
  {
    title: "Our commitment",
    body: "No upfront device cost, recovery as a service, and support from people who have run stores. We are not a tracking vendor that ghosts you after install.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1>Founded by seasoned auto dealers</h1>
          <p className="lede">
            We have been in the trenches. Ikon Technologies was founded by dealers for dealers to cut
            friction, build loyalty, and grow revenue — from Find the Car, Find the Keys to patented
            Smart Marketing and a dealer-branded Connect app.
          </p>
          <div className="hero-actions">
            <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
          </div>
        </div>
      </section>
      <section className="section soft page-visual-band" aria-label="The Ikon dealer loop">
        <div className="container">
          <figure className="page-visual">
            <img
              src="/assets/ikon-loop.jpg"
              alt="Lot, delivery, service, and app linked in one continuous dealer loop"
            />
          </figure>
        </div>
      </section>
      <section className="section">
        <div className="container benefit-stack">
          {commitments.map((item, index) => (
            <article key={item.title} className="benefit-row">
              <span className="benefit-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section dark cta">
        <div className="container cta-in">
          <span className="eyebrow">Work with us</span>
          <h2>Ready to run an Ikonic rooftop?</h2>
          <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
        </div>
      </section>
    </main>
  );
}
