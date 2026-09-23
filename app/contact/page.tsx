import { ArrowButton } from "@/components/ArrowButton";
import { email, phones } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

const contacts = [
  { label: phones.sales.label, href: phones.sales.href, value: phones.sales.display },
  { label: phones.support.label, href: phones.support.href, value: phones.support.display },
  { label: phones.consumer.label, href: phones.consumer.href, value: phones.consumer.display },
  { label: phones.ar.label, href: phones.ar.href, value: phones.ar.display },
  { label: "Email", href: `mailto:${email}`, value: email },
];

export default function ContactPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Corporate office</h1>
          <p className="lede">
            New dealer sales, dealer support, consumer support, and accounts receivable.
          </p>
          <div className="hero-actions">
            <ArrowButton href="/request-a-demo">Get a demo</ArrowButton>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <dl className="contact-directory">
            {contacts.map((item) => (
              <div className="contact-row" key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  <a href={item.href}>{item.value}</a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
