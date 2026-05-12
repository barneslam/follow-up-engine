import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Follow-Up Engine - Turn Sales Meetings Into Follow-Up Emails & Action Items",
  description: "Prepare before meetings, automate follow-up after. Turn sales meetings into agendas, follow-up emails, manager updates, and action items.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-background text-text">{children}</body>
    </html>
  );
}
