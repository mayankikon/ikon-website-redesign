import { ArrowButton } from "@/components/ArrowButton";
import { externalApps, phones } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealer Login",
  description: "Choose the traditional dealer portal or Ikon Toolbox Web.",
};

export default function DealerLoginPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Portal</span>
          <h1>Access your dealer portal</h1>
          <p className="lede">
            Select the platform your store is on to monitor inventory, manage lot logistics, and pull
            reports. This site does not collect dealer passwords.
          </p>
          <div className="choice-grid">
            <article className="choice-card is-default">
              <span className="eyebrow">Active platform · default</span>
              <h2>Traditional dealer portal</h2>
              <p>
                Day-to-day inventory, battery health, and stolen-vehicle support. Who uses this:
                dealerships onboarded on or before October 11, 2026.
              </p>
              <ArrowButton href={externalApps.legacyPortal} external>
                Launch current portal
              </ArrowButton>
            </article>
            <article className="choice-card">
              <span className="eyebrow">New</span>
              <h2>Ikon Toolbox Web</h2>
              <p>
                Upgraded interface and reporting. Who uses this: dealerships onboarded on or after
                October 12, 2026.
              </p>
              <ArrowButton href={externalApps.toolbox} external>
                Launch Toolbox Web
              </ArrowButton>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container article-body">
          <div className="sec-head">
            <span className="eyebrow">Timeline</span>
            <h2>2027 Migration Timeline</h2>
          </div>
          <p>
            Existing rooftops move in phased waves through 2027. The current portal stays supported
            until your store is migrated. Ikon will reach out before your rollout date to coordinate
            logins, permissions, and walkthroughs.
          </p>
          <p>
            Not sure which platform you are on? Call dealer support at {phones.support.display}.
          </p>
        </div>
      </section>
    </main>
  );
}
