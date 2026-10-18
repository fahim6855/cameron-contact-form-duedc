import Image from "next/image";
import ContactForm from "./ContactForm";

export default function Home() {
  return (
    <main className="relative z-10 grid w-full max-w-[980px] gap-8 rounded-[18px] border border-white/[0.08] bg-card px-6 pb-7 pt-[52px] shadow-[0_30px_80px_rgba(20,10,60,0.35)] md:grid-cols-[1fr_1.05fr] md:gap-14 md:px-14 md:pb-12 md:pt-16">
      <div className="absolute left-[22px] top-[18px] flex gap-1.5" aria-hidden="true">
        <span className="size-[7px] rounded-full bg-[#ff5f57]" />
        <span className="size-[7px] rounded-full bg-[#febc2e]" />
        <span className="size-[7px] rounded-full bg-[#28c840]" />
      </div>

      <section className="flex flex-col justify-between gap-7 md:gap-10">
        <div>
          <h1 className="mb-3.5 mt-2 text-[1.85rem] font-light leading-[1.15] tracking-[-0.01em] md:mt-10 md:text-[2.1rem]">
            Meet with Cameron
          </h1>
          <p className="mb-7 text-[0.8125rem] leading-[1.6] text-muted md:max-w-[30ch]">
            Let us show you how Cypulse can transform the way you govern and share your sensitive data.
          </p>
          <div className="flex items-center gap-3">
            <Image src="/cameron.svg" alt="Cameron Williamson" width={40} height={40} className="rounded-full" />
            <div>
              <strong className="block text-xs font-semibold">Cameron Williamson</strong>
              <span className="text-[0.6875rem] text-muted">Sales Manager</span>
            </div>
          </div>
        </div>

        {/* A plain link to the first input: no JavaScript needed */}
        <a
          href="#fullName"
          aria-label="Chat with Cameron"
          className="grid size-[46px] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#8b5cf6,#6d28f0)] text-white shadow-[0_0_0_5px_rgba(139,92,246,0.18),0_0_26px_6px_rgba(124,58,237,0.55)] hover:brightness-110"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" />
          </svg>
        </a>
      </section>

      <ContactForm />
    </main>
  );
}
