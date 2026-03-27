"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function HeaderAuthControls({ currentUser, ui }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
        className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        {ui.nav.signIn}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/account"
        className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        {ui.nav.account}
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isPending}
        className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
      >
        {ui.common.signOut}
      </button>
    </div>
  );
}

