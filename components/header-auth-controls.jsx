"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function HeaderAuthControls({ currentUser, ui, variant = "desktop" }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isMenuVariant = variant === "menu";
  const containerClass = isMenuVariant ? "flex flex-col gap-2 sm:flex-row" : "flex items-center gap-2 whitespace-nowrap";
  const buttonClass = isMenuVariant
    ? "theme-control inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition"
    : "theme-control inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition";
  const signOutClass = isMenuVariant
    ? "btn-primary inline-flex h-10 items-center justify-center px-4 disabled:opacity-70"
    : "btn-primary inline-flex h-10 items-center justify-center px-4 disabled:opacity-70";

  function handleSignOut() {
    startTransition(async () => {
      await fetch("/api/auth/sign-out", {
        method: "POST"
      });

      router.push("/");
      router.refresh();
    });
  }

  if (!currentUser) {
    return (
      <Link
        href="/sign-in"
        className={buttonClass}
      >
        {ui.nav.signIn}
      </Link>
    );
  }

  return (
    <div className={containerClass}>
      <Link
        href="/account"
        className={buttonClass}
      >
        {ui.nav.account}
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isPending}
        className={signOutClass}
      >
        {ui.common.signOut}
      </button>
    </div>
  );
}
