import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@marketing-workspace/auth', '@marketing-workspace/ui'],
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "your-sentry-org",
  project: "your-sentry-project",
});
