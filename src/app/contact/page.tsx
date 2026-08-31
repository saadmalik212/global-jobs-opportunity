"use client";

import { FormEvent, useState } from "react";
import { submitContactMessage } from "@/lib/contactMessages";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!subject) {
      newErrors.subject = "Please enter a subject.";
    } else if (subject.length < 3) {
      newErrors.subject = "Subject must contain at least 3 characters.";
    }

    if (!message) {
      newErrors.message = "Please enter your message.";
    } else if (message.length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    } else if (message.length > 1000) {
      newErrors.message = "Message cannot exceed 1000 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitError("Message bhej nahi saka — dobara try karein ya seedha email karein.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--color-canvas)] text-[var(--color-ink)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-ink)]">
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-[0.07]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="max-w-3xl">
            <button
              type="button"
              onClick={() =>
                document.getElementById("contact-form")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="inline-flex rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-primary)] transition hover:bg-[var(--color-primary)]/20"
            >
              Get In Touch
            </button>

            <h1 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-surface)] sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-surface)] sm:text-lg sm:leading-8">
              Have a question, suggestion, or need assistance? Send us a
              message and our team will be happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          {/* Contact Information */}
          <div className="rounded-3xl bg-[var(--color-ink)] p-5 text-[var(--color-surface)] sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Let&apos;s Connect
            </p>

            <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold">
              We&apos;re here to help
            </h2>

            <p className="mt-5 leading-7 text-[var(--color-surface)]/65">
              Whether you have feedback about our website, found an issue
              with a job listing, or simply have a question, you can contact
              Global Jobs Opportunity through the form.
            </p>

            <div className="mt-10 space-y-6">
              <ContactInfo
                icon={<MailIcon />}
                title="Email"
                text="support@globaljobsopportunity.com"
              />

              <ContactInfo
                icon={<ClockIcon />}
                title="Response Time"
                text="We aim to respond to inquiries as soon as possible."
              />

              <ContactInfo
                icon={<GlobeIcon />}
                title="Global Support"
                text="Our platform serves job seekers exploring opportunities worldwide."
              />
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-6 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-dark)]">
                Send a Message
              </p>

              <h2 className="mt-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
                How can we help?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                Fill out the form below and provide as much detail as possible.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 space-y-6"
            >
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              {/* Subject */}
              <FormField
                label="Subject"
                name="subject"
                type="text"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
              />

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[var(--color-ink)]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={1000}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full resize-none rounded-xl border bg-[var(--color-canvas)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted)]/70 focus:ring-4 ${
                    errors.message
                      ? "border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/10"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]/15"
                  }`}
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-[var(--color-accent)]">
                    {errors.message}
                  </p>
                )}

                <div className="mt-2 flex justify-end">
                  <span className="text-xs text-[var(--color-muted)]">
                    {formData.message.length}/1000
                  </span>
                </div>
              </div>

              {submitError && (
                <p className="text-sm text-[var(--color-accent)]">{submitError}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--color-surface)] shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/20 disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Submit Message"}
              </button>

              <p className="text-center text-xs leading-5 text-[var(--color-muted)]">
                Please make sure the information you provide is accurate so
                our team can respond appropriately.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/60 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-2xl">
            {/* Success Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-[var(--color-primary-dark)]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5 12 4 4L19 6"
                />
              </svg>
            </div>

            <h3 className="mt-6 font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
              Thank You for Contacting Us!
            </h3>

            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
              Your message has been submitted successfully. Our team will
              review your inquiry and get back to you as soon as possible.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-7 w-full rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[var(--color-ink)]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-[var(--color-canvas)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted)]/70 focus:ring-4 ${
          error
            ? "border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/10"
            : "border-[var(--color-border)] focus:border-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]/15"
        }`}
      />

      {error && (
        <p className="mt-2 text-sm text-[var(--color-accent)]">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactInfo({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-[var(--color-surface)]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-[var(--color-surface)]/55">
          {text}
        </p>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.2 2.4 3.4 5.4 3.4 9S14.2 18.6 12 21" />
      <path d="M12 3c-2.2 2.4-3.4 5.4-3.4 9S9.8 18.6 12 21" />
    </svg>
  );
}