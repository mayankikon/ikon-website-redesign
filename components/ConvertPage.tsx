import { ArrowButton } from "./ArrowButton";
import { LeadForm } from "./LeadForm";
import { solutions } from "@/content/solutions";

export function ConvertPage({
  title,
  lede,
  intent,
}: {
  title: string;
  lede: string;
  intent: "demo" | "webinar";
}) {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container split-form">
          <div>
            <span className="eyebrow">{intent === "webinar" ? "Webinar" : "Get a demo"}</span>
            <h1>{title}</h1>
            <p className="lede">{lede}</p>
            <ul className="plain-list">
              {solutions.map((item) => (
                <li key={item.id}>
                  <b>{item.label}.</b> {item.title}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm intent={intent} />
        </div>
      </section>
      <section className="section dark cta">
        <div className="container cta-in">
          <span className="eyebrow">Prefer to talk?</span>
          <h2>Call new dealer sales</h2>
          <p className="lede">Speak with the team at (817) 857-8430</p>
          <ArrowButton href="tel:+18178578430" external>
            Call sales
          </ArrowButton>
        </div>
      </section>
    </main>
  );
}
