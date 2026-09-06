import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogoMark } from "@/components/layout/Logo";
import { isAuthed } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Control Panel",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAuthed()) redirect("/admin");

  return (
    <div className="on-dark grid min-h-dvh place-items-center bg-page px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3">
          <LogoMark className="h-9 w-9 text-red" />
          <div>
            <p className="font-display text-lg font-extrabold tracking-tight text-heading">
              AGBA
            </p>
            <p className="data text-[0.55rem] uppercase tracking-[0.24em] text-muted-2">
              Control Panel
            </p>
          </div>
        </div>

        <div className="panel mt-8 p-7">
          <h1 className="font-display text-xl font-semibold text-heading">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted">
            Upload batch certificates, documents, testimonials and news.
          </p>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-muted-2">
          Access is limited to the AGBA team.
        </p>
      </div>
    </div>
  );
}
