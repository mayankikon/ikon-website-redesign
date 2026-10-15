import { ArrowButton, TextLink } from "@/components/ArrowButton";
import { HeroVideo } from "@/components/HeroVideo";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Icon } from "@/components/IconSprite";
import { departments } from "@/content/departments";
import { dealerLogos } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero">
        <HeroVideo />
        <div className="container hero-in">
          <span className="eyebrow">Lot operations &amp; customer engagement for dealerships</span>
          <h1>Agentic AI platform for lot optimization and customer retention</h1>
          <p className="lede">
            Ikon Technologies connects your lot, your F&amp;I office and your service drive to one
            telematics platform, so vehicles are found in seconds, stolen inventory comes back, and
            customers return to your bays instead of someone else&apos;s.
          </p>
          <div className="hero-actions">
            <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Dealer groups running Ikon Technologies">
        <div className="container">
          <p className="trust-label">Trusted across single-point stores and multi-rooftop groups</p>
        </div>
        <div className="marquee">
          <ul className="marquee-track">
            {dealerLogos.map((logo) => (
              <li key={logo.src}>
                <img className={logo.className} src={logo.src} alt={logo.alt} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section solutions" id="solutions">
        <div className="container">
          <div className="sec-head sec-head-centered">
            <span className="eyebrow">The program</span>
            <h2>Four solutions, one device, every department</h2>
            <p className="lede">
              Each piece stands on its own. Together they form a single loop that follows the vehicle
              from the lot, through delivery, and back into the service drive.
            </p>
          </div>
          <div className="solution-stack">
            {solutions.map((item, index) => (
              <article
                className={`solution-row${index % 2 === 1 ? " solution-row-reverse" : ""}`}
                key={item.id}
              >
                <div className="solution-copy">
                  <span className="num">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <TextLink href={item.href}>Learn more</TextLink>
                </div>
                <figure className="solution-visual">
                  <img src={item.homeImage} alt={item.homeImageAlt} />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section departments" id="departments">
        <div className="container">
          <div className="sec-head sec-head-centered">
            <span className="eyebrow">Impact</span>
            <h2>What changes in each department</h2>
            <p className="lede">
              The same data, read four different ways: velocity on the sales floor, gross in the box,
              throughput in the bays, and lifetime value on the owner&apos;s P&amp;L.
            </p>
          </div>
          <div className="dept">
            {departments.map((item) => (
              <article key={item.href}>
                <img className="face" src={item.avatar} alt="" />
                <div>
                  <span className="role">{item.role}</span>
                  <h3>{item.title}</h3>
                  <p>{item.homeBody}</p>
                  <TextLink href={item.href}>Explore</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="numbers" aria-labelledby="numbers-title">
        <div className="container numbers-in">
          <span className="eyebrow">Ikon Technologies in numbers</span>
          <h2 id="numbers-title">One connected program. Measurable impact across the store.</h2>
          <p className="numbers-note">
            Averages across stores running the full program, mapped to the departments above.
          </p>
          <div className="stats">
            <div className="stat">
              <div className="n">15 min</div>
              <div className="c">Saved per sale on locating cars and keys</div>
            </div>
            <div className="stat">
              <div className="n">$323</div>
              <div className="c">Average PVR uplift on Connected Car</div>
            </div>
            <div className="stat">
              <div className="n">32%</div>
              <div className="c">Response rate on mileage-triggered service outreach</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft" id="why">
        <div className="container split">
          <div>
            <span className="eyebrow">Why Ikon Technologies</span>
            <h2>Built by people who ran stores</h2>
            <p className="lede" style={{ marginTop: 22 }}>
              Most telematics is adapted for dealerships. Ikon Technologies was designed inside them,
              which is why it maps to how a store actually runs rather than to how a tracking vendor
              thinks it does.
            </p>
            <figure className="why-shot">
              <img
                src="/assets/ikon-loop.jpg"
                alt="The Ikon loop: lot, delivery, app and service feeding back into the lot"
              />
            </figure>
          </div>
          <ul className="pillars">
            <li>
              <Icon name="layers" className="icon pillar-icon" />
              <h3>One program, not four vendors</h3>
              <p>
                Lot, recovery, F&amp;I and retention run off the same device and the same data. Nothing
                to reconcile between systems.
              </p>
            </li>
            <li>
              <Icon name="circle-dollar-sign" className="icon pillar-icon" />
              <h3>No upfront device cost</h3>
              <p>Hardware and install carry no capital outlay. The program earns when the store does.</p>
            </li>
            <li>
              <Icon name="handshake" className="icon pillar-icon" />
              <h3>The relationship stays yours</h3>
              <p>
                A dealer-branded app keeps your name on the customer&apos;s phone through the whole
                ownership cycle, and brings them back for the next vehicle.
              </p>
            </li>
            <li>
              <Icon name="radar" className="icon pillar-icon" />
              <h3>Active recovery, not just a dot on a map</h3>
              <p>
                Recovery is a service, coordinated with law enforcement, not a dashboard you&apos;re left
                to work alone at 2am.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" id="results">
        <div className="container">
          <div className="sec-head sec-head-centered">
            <span className="eyebrow">Results</span>
            <h2>Stores running the Ikon Technologies way</h2>
            <p className="lede">
              What changed on the floor, in the box and in the drive, in the words of the people who
              run those departments.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      <section className="section dark cta" id="demo">
        <div className="cta-media" aria-hidden="true" />
        <div className="container cta-in">
          <span className="eyebrow">Get started</span>
          <h2>See it against your own store&apos;s numbers</h2>
          <p className="lede">
            Twenty minutes with someone who has run a dealership. We&apos;ll walk your lot, your F&amp;I
            menu and your service drive and show you where the program pays for itself.
          </p>
          <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
        </div>
      </section>
    </main>
  );
}
