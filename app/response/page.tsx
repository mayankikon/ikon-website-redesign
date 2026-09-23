import type { Metadata } from "next";

export const metadata: Metadata = { title: "Thank you" };

export default function ResponsePage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Received</span>
          <h1>Thank you</h1>
          <p className="lede">
            Your answers help update Dealer Index stats and topics we report back to stores.
          </p>
        </div>
      </section>
    </main>
  );
}
