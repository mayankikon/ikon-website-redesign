"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { navLinks } from "@/content/site";
import { ArrowButton } from "./ArrowButton";
import { Icon } from "./IconSprite";

type SiteHeaderProps = {
  overlay?: boolean;
};

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(!overlay);

  useEffect(() => {
    if (!overlay) {
      setIsScrolled(true);
      return;
    }
    function updateNav() {
      setIsScrolled(window.scrollY > 20);
    }
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, [overlay]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  return (
    <>
      <Link className="topbar" href="/register-for-the-webinar">
        <span>Live webinar: Fixed Ops in a $52K market, keeping the service drive full</span>
        <span className="topbar-arrow" aria-hidden="true">
          <Icon name="arrow-right" />
        </span>
      </Link>
      <header className={`nav${isScrolled || !overlay ? " is-scrolled" : ""}`}>
        <div className="container nav-in">
          <Link className="brand" href="/" aria-label="Ikon Technologies home">
            <img src="/assets/logo-white.svg" alt="Ikon Technologies" />
          </Link>
          <nav
            className={`nav-links${isOpen ? " is-open" : ""}`}
            id={menuId}
            data-testid="primary-nav"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link className="nav-login-mobile" href="/dealer-login" onClick={() => setIsOpen(false)}>
              Dealer Login
            </Link>
          </nav>
          <div className="nav-cta">
            <ArrowButton href="/dealer-login" variant="line-light" size="sm">
              Dealer Login
            </ArrowButton>
            <ArrowButton href="/request-a-demo" size="sm">
              Get a demo
            </ArrowButton>
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={isOpen}
              aria-controls={menuId}
              onClick={() => setIsOpen((open) => !open)}
            >
              <span className="nav-toggle-bars" aria-hidden="true" />
              <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
