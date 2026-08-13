"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import Logo from "./Logo";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
      if (!u && !isLoginPage) router.replace("/admin/login");
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage]);

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas text-muted">
        Checking session…
      </div>
    );
  }

  if (!user) return null; // redirect already in flight

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/admin" className="text-ink/80 hover:text-primary">
              Dashboard
            </Link>
            <Link href="/admin/new" className="text-ink/80 hover:text-primary">
              + New job
            </Link>
            <span className="hidden text-muted sm:inline">{user.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="rounded-full bg-ink/5 px-3 py-1.5 text-ink/80 hover:bg-ink/10"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
