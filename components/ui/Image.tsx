import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/cn";

export type ImageProps = Omit<NextImageProps, "alt"> & {
  /** Required. Describe the image; pass "" only for purely decorative images. */
  alt: string;
  rounded?: "none" | "thumb" | "card" | "arch";
};

const radii = {
  none: "",
  thumb: "rounded-thumb",
  card: "rounded-card",
  arch: "rounded-arch",
} as const;

/** next/image wrapper: alt is mandatory, applies token radii. */
export function Image({ alt, rounded = "card", className, ...rest }: ImageProps) {
  return <NextImage alt={alt} className={cn("object-cover", radii[rounded], className)} {...rest} />;
}
