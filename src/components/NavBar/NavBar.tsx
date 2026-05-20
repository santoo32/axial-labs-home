"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo/Logo";
import { Button } from "@/components/Button/Button";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import styles from "./NavBar.module.css";

type Props = { locale: string };

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function NavBar({ locale }: Props) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock + Escape key + focus management
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    // Focus first focusable element in drawer
    const el = mobileMenuRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    el?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on outside click
  const onOutsideClick = useCallback((e: MouseEvent) => {
    if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [menuOpen, onOutsideClick]);

  const close = () => setMenuOpen(false);

  const links = [
    { href: "#", label: t("work") },
    { href: "#services", label: t("services") },
    { href: "#pricing", label: t("pricing") },
    { href: "#about", label: t("about") },
  ];

  return (
    <header
      className={scrolled ? `${styles.nav} ${styles.scrolled}` : styles.nav}
      role="banner"
      ref={headerRef}
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
              <li key={label} className={styles.linkItem}>
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
            ref={hamburgerRef}
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
        ref={mobileMenuRef}
        className={menuOpen ? `${styles.mobileMenu} ${styles.mobileMenuOpen}` : styles.mobileMenu}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen || undefined}
      >
        <ul role="list">
          {links.map(({ href, label }) => (
            <li key={label}>
              <a href={href} className={styles.mobileLink} onClick={close}>
                {label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileFooter}>
          <Button variant="primary" href="#contact" className={styles.ctaMobile}>
            {t("cta")} →
          </Button>
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </nav>
    </header>
  );
}
