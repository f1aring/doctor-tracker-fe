import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <section className="w-full max-w-md rounded-card bg-surface p-8 shadow-card">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Sign-in functionality will be connected when authentication is
        implemented.
      </p>
      <form className="mt-6 space-y-4">
        <label className="block space-y-2 text-sm font-medium" htmlFor="email">
          <span>Email</span>
          <input
            autoComplete="email"
            className="w-full rounded-input border border-border bg-surface px-3 py-2 font-normal outline-none focus-visible:ring-2 focus-visible:ring-primary"
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </label>
        <label
          className="block space-y-2 text-sm font-medium"
          htmlFor="password"
        >
          <span>Password</span>
          <input
            autoComplete="current-password"
            className="w-full rounded-input border border-border bg-surface px-3 py-2 font-normal outline-none focus-visible:ring-2 focus-visible:ring-primary"
            id="password"
            name="password"
            type="password"
          />
        </label>
        <button
          className="w-full cursor-not-allowed rounded-button bg-primary px-4 py-2 font-medium text-primary-foreground opacity-60"
          disabled
          type="submit"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
