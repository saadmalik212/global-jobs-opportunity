export function buildApplyHref(rawValue: string): string {
  const value = rawValue.trim();
  if (!value) return "#";

  // Already a mailto: link or a full URL.
  if (/^(mailto:|https?:\/\/)/i.test(value)) return value;

  // Looks like a bare email address, e.g. "hr@company.com".
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return `mailto:${value}`;

  // Otherwise assume it's a URL missing its protocol, e.g.
  // "linkedin.com/jobs/view/123".
  return `https://${value}`;
}