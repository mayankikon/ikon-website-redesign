import Link from "next/link";
import { Icon } from "./IconSprite";

type ArrowButtonProps = {
  href: string;
  children: string;
  variant?: "primary" | "line-light" | "line";
  size?: "sm" | "md";
  external?: boolean;
};

export function ArrowButton({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
}: ArrowButtonProps) {
  const className = [
    "btn",
    size === "sm" ? "btn-sm" : "",
    variant === "primary" ? "btn-primary" : "",
    variant === "line-light" ? "btn-line-light" : "",
    variant === "line" ? "btn-line" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {variant !== "line-light" ? (
        <span className="button-arrow" aria-hidden="true">
          <Icon name="arrow-right" />
          <Icon name="arrow-right" />
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <Link className="tlink" href={href}>
      {children} <Icon name="arrow-right" />
    </Link>
  );
}
