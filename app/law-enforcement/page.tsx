import { FaqList } from "@/components/ContentBlocks";
import { phones } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Law Enforcement" };

const capabilities = [
  {
    title: "Active stolen vehicle recovery",
    body: "Stolen Mode shares a tracking link so officers are not working a last-known from a spreadsheet.",
  },
  {
    title: "Forensic evidence and prosecution support",
    body: "Historical pings that hold up when the case leaves the lot and enters court.",
  },
];

export default function LawEnforcementPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Partners</span>
          <h1>Empowering law enforcement with data that closes cases</h1>
          <p className="lede">
            Active stolen-vehicle recovery, forensic location history, and a 99.8% recovery rate with
            an 18-minute average. Privacy stays in the lane: dealer operations, customer-authorized
            features, and lawful recovery.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container benefit-stack">
          {capabilities.map((item, index) => (
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
      <section className="section soft">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
          </div>
          <FaqList
            items={[
              {
                question: "How can my department get access to Ikon’s Law Enforcement Portal?",
                answer: `Contact the Ikon liaison through dealer support at ${phones.support.display}. Access is for departments working recoveries with Ikon dealers.`,
              },
              {
                question: "What is the typical recovery time?",
                answer: "18 minutes on average, with a 99.8% recovery rate on the program.",
              },
              {
                question: "How does Ikon protect citizen privacy?",
                answer:
                  "Location is used for dealer operations, customer-authorized app features, and lawful recovery — not sold as a consumer tracking feed.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
