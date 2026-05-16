"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo/Logo";
import { Button } from "@/components/Button/Button";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import styles from "./NavBar.module.css";

type Props = { locale: string };

export function NavBar({ locale }: Props) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const links = [
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={[styles.nav, scrolled ? styles.scrolled : ""].join(" ")}
      role="banner"
      ref={menuRef}
    >
      <div className={styles.inner}>
        {/* Brand */}
        <Link href="/" className={styles.brand} aria-label="Axial Labs home">
          <Logo variant="lockup" />
        </Link>

        {/* Desktop links */}
        <nav className={styles.links} aria-label="Main navigation">
          <ul role="list">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={styles.link}>
                  {label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: CTA + locale + hamburger */}
        <div className={styles.actions}>
          <Button variant="primary" href="#contact" className={styles.ctaDesktop}>
            {t("cta")} →
          </Button>
          <LocaleSwitcher currentLocale={locale} />

          {/* Hamburger */}
          <button
            type="button"
            className={styles.hamburger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={[styles.mobileMenu, menuOpen ? styles.mobileMenuOpen : ""].join(" ")}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="primary" href="#contact" className={styles.ctaMobile}>
          {t("cta")} →
        </Button>
      </nav>
    </header>
  );
}
