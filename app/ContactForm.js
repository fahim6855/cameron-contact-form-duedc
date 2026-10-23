"use client";

import { useActionState } from "react";
import { sendMessage } from "./actions";

const fields = [
  { name: "fullName", label: "Full name", placeholder: "Your full name", type: "text", autoComplete: "name" },
  { name: "companyName", label: "Company name", placeholder: "Your company name", type: "text", autoComplete: "organization" },
  { name: "email", label: "Email", placeholder: "Your email address", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", placeholder: "Your phone number", type: "tel", autoComplete: "tel" },
];

export default function ContactForm() {
  // state = whatever sendMessage returned last. isPending = true while it runs.
  const [state, formAction, isPending] = useActionState(sendMessage, {});
  const errors = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-[18px] pt-2">
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col gap-2">
          <label htmlFor={f.name} className="text-[0.625rem] font-semibold uppercase tracking-[0.06em]">
            {f.label} <span className="text-muted">*</span>
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            placeholder={f.placeholder}
            defaultValue={state.values?.[f.name]}
            aria-invalid={Boolean(errors[f.name])}
            className="h-11 rounded-[10px] border border-white/[0.08] bg-field px-3.5 text-[0.8125rem] text-ink placeholder:text-[#666b82] focus:border-brand-hi focus:outline-none focus:ring-[3px] focus:ring-brand-hi/25 aria-invalid:border-danger"
          />
          {errors[f.name] && <p className="text-[0.6875rem] text-danger">{errors[f.name]}</p>}
        </div>
      ))}

      <div className="mt-1 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-start gap-2.5 text-[0.625rem] leading-normal text-muted sm:max-w-[30ch]">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={state.values?.consent}
            className="mt-px size-[15px] shrink-0 accent-brand [color-scheme:dark]"
          />
          I agree that my personal data will be processed in accordance with the privacy policy.
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer inline-flex h-11 w-full min-w-32 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-xs font-medium text-white enabled:hover:bg-[#7c3aed] disabled:cursor-progress disabled:opacity-80 sm:h-[38px] sm:w-auto"
        >
          {isPending && <span className="size-3 animate-spin rounded-full border-2 border-white/35 border-t-white" />}
          {isPending ? "Sending…" : "Send Message"}
        </button>
      </div>

      {errors.consent && <p className="text-[0.6875rem] text-danger">{errors.consent}</p>}

      {state.message && (
        <p
          role={state.success ? "status" : "alert"}
          className={`rounded-lg border px-3 py-2.5 text-xs ${
            state.success
              ? "border-ok/30 bg-ok/[0.08] text-ok"
              : "border-danger/30 bg-danger/[0.08] text-danger"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
