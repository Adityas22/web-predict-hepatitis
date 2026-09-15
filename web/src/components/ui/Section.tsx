import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  tint?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  tint,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-t border-line py-16 sm:py-20",
        tint && "bg-surface",
        className,
      )}
    >
      <div className="container-page">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        {title ? (
          <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-ink sm:text-[2rem] sm:leading-tight">
            {title}
          </h2>
        ) : null}
        {lede ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {lede}
          </p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
