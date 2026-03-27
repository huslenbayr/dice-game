"use client";

import { useState } from "react";
import Image from "next/image";

const LOGO_SRC = "/assets/MongolWay%20logo%20in%20minimal%20black%20and%20white.png";

export function BrandLogo({ brandName, priority = false, variant = "header", className = "" }) {
  const [hasError, setHasError] = useState(false);
  const sizeClass = variant === "footer" ? "h-20 w-56" : "h-14 w-44";

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-ink px-4 py-3 font-display text-xl font-semibold text-white ${className}`}
      >
        {brandName}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      <Image
        src={LOGO_SRC}
        alt={`${brandName} logo`}
        fill
        priority={priority}
        sizes={variant === "footer" ? "224px" : "176px"}
        className="object-contain object-left"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

