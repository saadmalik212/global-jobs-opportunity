"use client";

import { useEffect, useState } from "react";
import { fetchContactMessages, ContactMessage } from "@/lib/contactMessages";
import { timeAgo } from "@/lib/timeAgo";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactMessages()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">
        Contact Messages
      </h1>

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-muted">
          Abhi tak koi message nahi aaya.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <p className="font-display font-bold text-ink">{msg.subject}</p>
                  <p className="text-xs text-muted">
                    {msg.name} ·{" "}
                    <a href={`mailto:${msg.email}`} className="text-primary hover:underline">
                      {msg.email}
                    </a>
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {timeAgo(msg.createdAt)}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-ink/85">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}