import Link from "next/link";

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029Vb90C7aCnA81lk3CIO43";

export default function WhatsAppBanner() {
  return (
    <a
      href={WHATSAPP_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary-light px-5 py-4 transition hover:border-primary/40 sm:flex-row"
    >
        
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg text-white">
          📲
        </span>
        <div>
          <p className="font-display text-sm font-bold text-primary-dark sm:text-base">
            Never miss a job alert
          </p>
          <p className="text-xs text-ink/70 sm:text-sm">
            Follow our WhatsApp Channel for instant updates the moment a new job goes live.
          </p>
        </div>
      </div>
      <span className="w-full shrink-0 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-primary-dark sm:w-auto">
        Follow on WhatsApp
      </span>
    </a>
  );
}