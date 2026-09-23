import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join Our Team" };

const values = [
  {
    title: "Agility",
    body: "Retail never sits still. Neither does the product. We hire people who can turn with the store.",
  },
  {
    title: "Ownership",
    body: "Finish the work and stand behind the impact on dealer partners, not just the ticket.",
  },
  {
    title: "Result-driven",
    body: "Family-oriented, startup pace, and accountable to numbers stores can feel on the floor.",
  },
];

export default function JobsPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Openings</span>
          <h1>Join our team</h1>
          <p className="lede">
            We look for tech people for car people: an owner’s mindset, agility, and a bias to
            results. Role listings will land here when they are open.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container benefit-stack">
          {values.map((item, index) => (
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
    </main>
  );
}
