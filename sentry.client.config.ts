import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://85ef66527f2c21c418412c524889288a@o4512008419934208.ingest.us.sentry.io/4512008434352128",
  tracesSampleRate: 1.0,
});