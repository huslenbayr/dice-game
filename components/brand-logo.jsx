"use client";

import { useState } from "react";
import Image from "next/image";

const LOGO_SRC = "/assets/MongolWay_logo_in_minimal_black_and_white-removebg-preview.png";

export function BrandLogo({ brandName, priority = false, variant = "header", className = "" }) {
  const [hasError, setHasError] = useState(false);
  const sizeMap = {
    header: {
      width: 170,
      height: 42,
      className: "h-7 w-auto sm:h-8"
    },
    footer: {
      width: 220,
      height: 56,
      className: "h-10 w-auto sm:h-12"
    }
  };
  const currentSize = sizeMap[variant] || sizeMap.header;

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-clay px-3 py-2 font-display text-sm font-semibold text-sand sm:px-4 sm:text-base ${className}`}
      >
        {brandName}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={LOGO_SRC}
        alt={`${brandName} logo`}
        width={currentSize.width}
        height={currentSize.height}
        priority={priority}
        sizes={variant === "footer" ? "220px" : "170px"}
        className={`${currentSize.className} object-contain object-left`}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
