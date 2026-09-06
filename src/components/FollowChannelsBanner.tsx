const CHANNELS = [
  {
    name: "LinkedIn",
    description: "Follow us for career news and job updates",
    href: "https://www.linkedin.com/company/global-jobs-opportunity/",
    className: "border-[#0a66c2]/20 bg-[#eaf4ff] hover:border-[#0a66c2]/50",
    image: "/linkedin-channel.svg",
  },
  {
    name: "WhatsApp Channel",
    description: "Get new job alerts directly on WhatsApp",
    href: "https://whatsapp.com/channel/0029Vb90C7aCnA81lk3CIO43",
    className: "border-[#25d366]/25 bg-[#ecfff3] hover:border-[#25d366]/55",
    image: "/whatsapp-channel.svg",
  },
] as const;

export default function FollowChannelsBanner() {
  return (
    <section aria-label="Follow our channels" className="grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((channel) => (
          <a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Global Jobs Opportunity on ${channel.name}`}
            className={`flex min-h-36 items-center gap-5 rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${channel.className}`}
          >
            <img src={channel.image} alt={`${channel.name} channel`} className="h-24 w-24 shrink-0 rounded-2xl shadow-sm" />
            <span>
              <span className="block font-display text-base font-bold text-ink">{channel.name}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink/70">{channel.description}</span>
              <span className="mt-2 block text-sm font-semibold text-ink underline underline-offset-2">Follow now →</span>
            </span>
          </a>
        ))}
    </section>
  );
}