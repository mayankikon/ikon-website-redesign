import { ArrowButton, TextLink } from "./ArrowButton";
import { FaqList, QuoteGrid, StatsRow } from "./ContentBlocks";
import { dealerQuotes } from "@/content/stories";
import type { Solution } from "@/content/solutions";

export function SolutionTemplate({ solution }: { solution: Solution }) {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{solution.label}</span>
          <h1>{solution.title}</h1>
          <p className="lede">{solution.lede}</p>
          <div className="hero-actions">
            <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
          </div>
          <StatsRow stats={solution.stats} />
        </div>
      </section>
      <section className="section soft page-visual-band" aria-label={solution.pageImageAlt}>
        <div className="container">
          <figure className="page-visual">
            <img src={solution.pageImage} alt={solution.pageImageAlt} />
          </figure>
        </div>
      </section>
      <section className="section">
        <div className="container benefit-stack">
          {solution.benefits.map((benefit, index) => (
            <article key={benefit.title} className="benefit-row">
              <span className="benefit-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </div>
            </article>
          ))}
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
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
          </div>
          <FaqList items={solution.faqs} />
          <p className="more-link">
            <TextLink href="/faq">See all FAQs</TextLink>
          </p>
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
