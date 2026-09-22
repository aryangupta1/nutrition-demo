import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Width = "content" | "narrow";

const widths: Record<Width, string> = {
  content: "max-w-content",
  narrow: "max-w-narrow",
};

export function Container({
  width = "content",
  className,
  children,
}: {
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("mx-auto w-full px-gutter", widths[width], className)}>{children}</div>;
}
