import { useMemo } from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface Props {
  width?: ImageProps["width"];
  height?: ImageProps["height"];
  src?: ImageProps["src"];
  alt?: ImageProps["alt"];
  className?: string;
}

export const Logo = ({
  width = 62,
  height,
  src = "/logo.png",
  alt = "logo",
  className,
  ...props
}: Props) => {
  // Define the aspect ratio based on your original dimensions
  const aspectRatio = 68 / 32;

  // Dynamically calculate height if not provided
  const calculatedHeight = useMemo(() => {
    const numericWidth = Number(width);
    const numericHeight = Number(height);

    // Calculate the height based on the aspect ratio only if both are valid numbers
    if (!isNaN(numericWidth)) {
      return Math.round(
        !isNaN(numericHeight) ? numericHeight : numericWidth / aspectRatio,
      );
    }

    // If the width is invalid, just return the provided height or undefined
    return numericHeight;
  }, [width, height]);
  return (
    <Link
      href={"/new"}
      className={cn(
        "flex shrink-0 items-center gap-x-0.5 pb-3 pl-2 pt-0",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={calculatedHeight}
        {...props}
      />
    </Link>
  );
};
