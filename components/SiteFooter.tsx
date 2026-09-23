import Link from "next/link";
import { footerCompany, footerSolutions, phones } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/" aria-label="Ikon Technologies home">
              <img src="/assets/logo-white.svg" alt="Ikon Technologies" />
            </Link>
            <p className="blurb">GPS, telematics and AI for dealerships. Built by dealers, for dealers.</p>
          </div>
          <div>
            <h4>Solutions</h4>
            <ul>
              {footerSolutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              {footerCompany.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/terms-conditions">Terms</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="contact">
              <li>
                <span className="clabel">{phones.sales.label}</span>
                <a href={phones.sales.href}>{phones.sales.display}</a>
              </li>
              <li>
                <span className="clabel">{phones.support.label}</span>
                <a href={phones.support.href}>{phones.support.display}</a>
              </li>
              <li>
                <span className="clabel">{phones.consumer.label}</span>
                <a href={phones.consumer.href}>{phones.consumer.display}</a>
              </li>
              <li className="contact-cta">
                <Link href="/request-a-demo">Request a demo</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 VBI Group Inc.</span>
          <span>GPS, telematics and AI for dealerships</span>
        </div>
      </div>
    </footer>
  );
}
