import type { Metadata } from "next";
import { ArrowButton, TextLink } from "@/components/ArrowButton";
import { DisplayMockup, PhoneMockup } from "@/components/DeviceMockup";
import { Icon } from "@/components/IconSprite";
import { mobileTour, tourHero, webTour, type TourItem } from "@/content/productTour";

export const metadata: Metadata = {
  title: "Product Tour",
  description:
    "See how Ikon connects lot management, theft recovery, smart marketing and the dealer-branded Connect app in one platform.",
};

function TourMeta({ item }: { item: TourItem }) {
  return (
    <div className="tour-meta">
      <span className="tour-product">{item.product}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <TextLink href={item.href}>{`Explore ${item.linkLabel}`}</TextLink>
    </div>
  );
}

function SurfaceHead({ id, icon, title, lede }: { id: string; icon: string; title: string; lede: string }) {
  return (
    <div className="tour-head">
      <div className="tour-head-title">
        <span className="tour-icon" aria-hidden="true">
          <Icon name={icon} />
        </span>
        <h2 id={id}>{title}</h2>
      </div>
      <p className="lede">{lede}</p>
    </div>
  );
}

export default function ProductTourPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero tour-hero">
        <div className="container tour-hero-in">
          <div className="tour-hero-copy">
            <span className="eyebrow">Product tour</span>
            <h1>See Ikon at work</h1>
            <p className="lede">
              Explore how Toolbox and Connect bring lot management, keys, audits and service marketing
              into one system, for your team and your customers.
            </p>
            <div className="hero-actions">
              <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
              <ArrowButton href="#web" variant="line-light">
                Start the tour
              </ArrowButton>
            </div>
          </div>
          <div className="tour-hero-devices">
            <DisplayMockup screen={tourHero.display.screen} screenAlt={tourHero.display.screenAlt} />
            <PhoneMockup
              screen={tourHero.toolboxPhone.screen}
              screenAlt={tourHero.toolboxPhone.screenAlt}
              className="tour-hero-phone tour-hero-phone-toolbox"
            />
            <PhoneMockup
              screen={tourHero.connectPhone.screen}
              screenAlt={tourHero.connectPhone.screenAlt}
              className="tour-hero-phone tour-hero-phone-connect"
            />
          </div>
        </div>
      </section>

      <section className="section tour-section" id="web" aria-labelledby="tour-web">
        <div className="container">
          <SurfaceHead
            id="tour-web"
            icon="monitor"
            title="Web"
            lede="Toolbox is where your teams run the store: every unit and key on the lot, floorplan audits, and campaigns that fill the service drive."
          />
          <div className="tour-grid tour-grid-web">
            {webTour.map((item) => (
              <article key={item.title} className={`tour-card tour-card-${item.product.toLowerCase()}`}>
                <div className="tour-stage">
                  <DisplayMockup screen={item.screen} screenAlt={item.screenAlt} />
                </div>
                <TourMeta item={item} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft tour-section" id="mobile" aria-labelledby="tour-mobile">
        <div className="container">
          <SurfaceHead
            id="tour-mobile"
            icon="smartphone"
            title="Mobile"
            lede="Toolbox goes with your team onto the lot, and Connect puts your store in your customers’ pocket."
          />
          <div className="tour-grid tour-grid-mobile">
            {mobileTour.map((item) => (
              <article key={item.title} className={`tour-card tour-card-${item.product.toLowerCase()}`}>
                <div className="tour-stage tour-stage-phone">
                  <PhoneMockup screen={item.screen} screenAlt={item.screenAlt} />
                </div>
                <TourMeta item={item} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark cta">
        <div className="container cta-in">
          <span className="eyebrow">Get started</span>
          <h2>See it live with your own inventory</h2>
          <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
        </div>
      </section>
    </main>
  );
}
