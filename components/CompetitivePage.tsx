import Link from "next/link";
import { ArrowButton } from "./ArrowButton";
import { QuoteGrid } from "./ContentBlocks";
import { solutions } from "@/content/solutions";
import { dealerQuotes } from "@/content/stories";
import type { Competitor } from "@/content/competitors";

export function CompetitivePage({ competitor }: { competitor: Competitor }) {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Why Ikon</span>
          <h1>{competitor.title}</h1>
          <p className="lede">{competitor.lede}</p>
          <div className="hero-actions">
            <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container benefit-stack">
          {competitor.points.map((point, index) => (
            <article key={point.title} className="benefit-row">
              <span className="benefit-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Compare</span>
            <h2>How Ikon beats {competitor.name} in what matters</h2>
          </div>
          <div className="compare">
            <div className="compare-head">
              <span>Capability</span>
              <span>Ikon</span>
              <span>{competitor.name}</span>
            </div>
            {competitor.rows.map((row) => (
              <div className="compare-row" key={row.label}>
                <span>{row.label}</span>
                <span>{row.ikon}</span>
                <span>{row.them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Program</span>
            <h2>The four solutions in the Ikon program</h2>
          </div>
          <ul className="plain-list">
            {solutions.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.label} — {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Dealers</span>
            <h2>What our dealers are saying</h2>
          </div>
          <QuoteGrid quotes={dealerQuotes.slice(0, 3)} />
        </div>
      </section>
      <section className="section dark cta">
        <div className="container cta-in">
          <span className="eyebrow">Get started</span>
          <h2>Ready to switch?</h2>
          <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
        </div>
      </section>
    </main>
  );
}
