import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-electric-400 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-mist-50 text-ink-950 hover:bg-strong hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.25)]",
        accent:
          "bg-electric-500 text-white hover:bg-electric-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(47,116,255,0.5)]",
        outline:
          "border border-line/15 text-mist-100 hover:border-line/30 hover:bg-line/5",
        ghost: "text-mist-200 hover:text-strong hover:bg-line/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof button> & {
  className?: string;
  children: React.ReactNode;
} & (
    | ({ href: string } & React.ComponentProps<typeof Link>)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  const classes = cn(button({ variant, size }), className);
  if ("href" in props && props.href) {
    const { href, ...rest } = props as { href: string } & React.ComponentProps<typeof Link>;
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
