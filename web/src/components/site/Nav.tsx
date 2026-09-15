"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";

function BrandMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-accent"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M12 2.5S5 10.5 5 15.5a7 7 0 0 0 14 0c0-5-7-13-7-13Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 5.5c.3 3.2-1.6 4.8-1.6 7.2a1.8 1.8 0 0 0 3.6 0c0-1.4-.8-2.4-1.2-3.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="HepaCheck — beranda"
        >
          <BrandMark />
          <span className="font-serif text-lg font-semibold tracking-tight">
            Hepa<span className="text-accent">Check</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigasi utama"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/predict" size="sm" className="ml-2">
            Coba Prediksi
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper lg:hidden"
          aria-label="Navigasi seluler"
        >
          <div className="container-page flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-sm text-ink-soft hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink
              href="/predict"
              size="md"
              className="mt-3 w-full"
            >
              Coba Prediksi
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
