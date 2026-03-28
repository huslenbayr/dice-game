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
    ? "inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
    : "inline-flex h-9 items-center justify-center rounded-full border border-slate-200 px-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100";
  const signOutClass = isMenuVariant
    ? "inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
    : "inline-flex h-9 items-center justify-center rounded-full bg-slate-900 px-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70";

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
