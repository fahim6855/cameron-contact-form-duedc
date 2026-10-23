export const metadata = { title: "Messages | Cypulse admin" };

export default async function AdminPage() {
  const res = await fetch(`${process.env.SUPABASE_URL}/functions/v1/list-messages`, { cache: "no-store" });
  const result = await res.json();
  const messages = result.data ?? [];

  return (
    <main className="relative z-10 w-full max-w-[1040px] rounded-[18px] border border-white/[0.08] bg-card px-5 pb-6 pt-[52px] shadow-[0_30px_80px_rgba(20,10,60,0.35)] md:px-10 md:pb-9 md:pt-14">
      <h1 className="mb-1.5 text-[1.85rem] font-light leading-[1.15] tracking-[-0.01em] md:text-[2.1rem]">Messages</h1>
      <p className="mb-7 text-[0.8125rem] text-muted">
        {result.success ? `${messages.length} saved` : result.message}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-muted">
              {["Name", "Company", "Email", "Phone", "Received (UTC+6)"].map((h) => (
                <th key={h} className="whitespace-nowrap px-3.5 pb-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} className="border-t border-white/[0.08]">
                <td className="p-3.5 font-medium">{m.full_name}</td>
                <td className="p-3.5">{m.company_name}</td>
                <td className="p-3.5">
                  <a href={`mailto:${m.email}`} className="text-brand-hi hover:underline">{m.email}</a>
                </td>
                <td className="p-3.5">{m.phone}</td>
                <td className="whitespace-nowrap p-3.5 text-muted">
                  {new Date(m.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
