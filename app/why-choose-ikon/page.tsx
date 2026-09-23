import { ArrowButton } from "@/components/ArrowButton";
import { FaqList, StatsRow } from "@/components/ContentBlocks";
import { faqs } from "@/content/faqs";
import { solutions } from "@/content/solutions";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Choose Ikon",
  description: "Why franchise dealers choose $0 upfront lot management, 99.8% recovery, and Smart Marketing.",
};

const pillars = [
  {
    title: "Sales velocity",
    body: "Find cars and keys in seconds. Stay appointment ready. Recover stolen units in minutes, not days.",
  },
  {
    title: "F&I profitability",
    body: "A useful, non-cancellable product with an app and a $10,000 theft benefit the customer understands.",
  },
  {
    title: "Service loyalty",
    body: "Mileage-triggered texts that fill the drive and keep the next sale in your database.",
  },
];

export default function WhyChoosePage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Why Ikon</span>
          <h1>The franchise dealer’s path to protection and profitability</h1>
          <p className="lede">
            Ikon goes far beyond a GPS ping. Built by dealers for dealers, the program turns
            operational friction into order: sales velocity, non-cancellable PVR, and service
            retention with $0 upfront device costs.
          </p>
          <div className="hero-actions">
            <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
          </div>
          <StatsRow
            stats={[
              { value: "600+", caption: "Franchise dealers on the program" },
              { value: "99.8%", caption: "Theft recovery rate" },
              { value: "50+", caption: "Incremental ROs per month" },
            ]}
          />
        </div>
      </section>
      <section className="section soft page-visual-band" aria-label="How the Ikon program connects the store">
        <div className="container">
          <figure className="page-visual">
            <img
              src="/assets/illustrations/the-loop.svg"
              alt="Lot, delivery, service, and app linked in one continuous dealer loop"
            />
          </figure>
        </div>
      </section>
      <section className="section">
        <div className="container benefit-stack">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="benefit-row">
              <span className="benefit-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Program</span>
            <h2>The four solutions</h2>
          </div>
          <ul className="plain-list">
            {solutions.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link> — {item.title}
              </li>
            ))}
          </ul>
          <p className="more-link">
            Compare Ikon to{" "}
            <Link href="/why-dealers-choose-ikon-over-lojack">LoJack</Link>,{" "}
            <Link href="/why-dealers-choose-ikon-over-recovr">RecovR</Link>,{" "}
            <Link href="/why-dealers-choose-ikon-over-karr-security">KARR</Link>, and{" "}
            <Link href="/why-dealers-choose-ikon-over-passtime-gps">PassTime GPS</Link>.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
          </div>
          <FaqList items={faqs.slice(0, 6)} />
        </div>
      </section>
      <section className="section dark cta">
        <div className="container cta-in">
          <span className="eyebrow">Get started</span>
          <h2>See it against your own store’s numbers</h2>
          <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
        </div>
      </section>
    </main>
  );
}
