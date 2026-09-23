import type { Metadata } from "next";
import type { ReactNode } from "react";

function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>{title}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container legal-body">{children}</div>
      </section>
    </main>
  );
}

export const privacyMetadata: Metadata = { title: "Privacy Policy" };

export function PrivacyCopy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Ikon Technologies, operated by VBI Group Inc., collects dealer and consumer information to
        run lot operations, recovery, the dealer-branded Connect app, and Smart Marketing. We do not
        sell location history as a consumer data product.
      </p>
      <p>
        Contact privacy questions at info@ikontechnologies.com or the phones listed on the contact
        page. This page is a redesign summary; the controlling policy is the live Ikon Technologies
        privacy statement until counsel ports the full text.
      </p>
    </LegalLayout>
  );
}

export function TermsCopy({ title }: { title: string }) {
  return (
    <LegalLayout title={title}>
      <p>
        These terms are incorporated into the Authorized Dealer Agreement. They cover implementation,
        consignment or pre-paid hardware, recovery services, and marketing features.
      </p>
      <p>
        Choice of law and venue, notice, and the parties’ relationship follow the executed dealer
        agreement. This redesign page is not a substitute for the signed addendum.
      </p>
      <p>Questions: info@ikontechnologies.com.</p>
    </LegalLayout>
  );
}
