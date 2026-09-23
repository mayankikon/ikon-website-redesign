import { ArrowButton } from "@/components/ArrowButton";
import { QuoteGrid } from "@/components/ContentBlocks";
import { dealerQuotes, recoveryStories } from "@/content/stories";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dealer Stories" };

export default function DealerStoriesPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Results</span>
          <h1>Dealer stories</h1>
          <p className="lede">
            Recovery cases and store-floor results. GPS plus a desk that shows up, whether the event
            is smash-and-grab, identity fraud, or a family emergency.
          </p>
          <div className="hero-actions">
            <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Recoveries</span>
            <h2>Cases from the desk</h2>
          </div>
          <div className="story-grid">
            {recoveryStories.map((story) => (
              <article className="story-card" key={story.title}>
                <h3>{story.title}</h3>
                <p>{story.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Dealers</span>
            <h2>What our dealers are saying</h2>
          </div>
          <QuoteGrid quotes={dealerQuotes} />
        </div>
      </section>
      <section className="section dark cta">
        <div className="container cta-in">
          <span className="eyebrow">Get started</span>
          <h2>Want results like these?</h2>
          <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
        </div>
      </section>
    </main>
  );
}
