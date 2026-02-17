import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/ui/toast-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FollowTracker — Instagram Follower Analytics",
    template: "%s | FollowTracker",
  },
  description:
    "Track your Instagram followers, discover who unfollowed you, find mutual connections, and analyze your growth with powerful analytics.",
  keywords: [
    "instagram",
    "follower tracker",
    "unfollowers",
    "mutual followers",
    "instagram analytics",
  ],
  authors: [{ name: "Roxy Emanuel" }],
  openGraph: {
    title: "FollowTracker — Instagram Follower Analytics",
    description:
      "Track your Instagram followers, discover who unfollowed you, and analyze your growth.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <ThemeProvider>
            <ToastProvider />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
