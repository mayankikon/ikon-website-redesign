import { ArrowButton, TextLink } from "./ArrowButton";
import { StatsRow } from "./ContentBlocks";
import type { Department } from "@/content/departments";

export function DepartmentTemplate({ department }: { department: Department }) {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{department.role}</span>
          <h1>{department.title}</h1>
          <p className="lede">{department.lede}</p>
          <p className="lede promise">{department.promise}</p>
          <div className="hero-actions">
            <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
          </div>
          <StatsRow stats={department.stats} />
        </div>
      </section>
      <section className="section soft page-visual-band" aria-label={department.sceneImageAlt}>
        <div className="container">
          <figure className="page-visual">
            <img src={department.sceneImage} alt={department.sceneImageAlt} />
          </figure>
        </div>
      </section>
      <section className="section">
        <div className="container benefit-stack">
          {department.features.map((feature, index) => (
            <article key={feature.title} className="benefit-row">
              <span className="benefit-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Dealers Digest</span>
            <h2>More tips for your role</h2>
          </div>
          <p className="more-link">
            <TextLink href="/dealers-digest">Discover more tips on the blog</TextLink>
          </p>
        </div>
      </section>
      <section className="section dark cta">
        <div className="container cta-in">
          <span className="eyebrow">Get started</span>
          <h2>See what Ikon does for your department</h2>
          <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
        </div>
      </section>
    </main>
  );
}
