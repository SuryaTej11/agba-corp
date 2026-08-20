"use client";

import { ActionForm, Field, SubmitButton } from "@/components/admin/AdminUI";
import { loginAction } from "../actions";

export function LoginForm() {
  return (
    <ActionForm action={loginAction} className="mt-7">
      <Field
        label="Password"
        name="password"
        type="password"
        required
        placeholder="••••••••••"
      />
      <div className="mt-6">
        <SubmitButton>Sign in</SubmitButton>
      </div>
    </ActionForm>
  );
}
