import type {
  Metadata,
} from "next";

import "./globals.css";

import {
  Providers,
} from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Doctor Tracker",
    template: "%s | Doctor Tracker",
  },

  description:
    "Administrative portal for managing doctors and patients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}