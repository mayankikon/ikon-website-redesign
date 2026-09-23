import { ArrowButton } from "@/components/ArrowButton";
import { FaqList } from "@/components/ContentBlocks";
import { faqs } from "@/content/faqs";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Support</span>
          <h1>Frequently asked questions</h1>
          <p className="lede">
            Straight answers on devices, recovery, F&amp;I, Smart Marketing, and how the program
            lands in the store.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <FaqList items={faqs} />
        </div>
      </section>
      <section className="section dark cta">
        <div className="container cta-in">
          <span className="eyebrow">Still have questions?</span>
          <h2>Talk through it with our team</h2>
          <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
        </div>
      </section>
    </main>
  );
}
