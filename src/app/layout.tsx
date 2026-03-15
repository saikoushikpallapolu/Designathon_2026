import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafeVoice | VNR VJIET Confidential Reporting",
  description: "AI-powered harassment reporting and escalation platform for VNR VJIET campus. File confidential reports without revealing your identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800;900&family=Roboto+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F8F9FA]">
        {children}
      </body>
    </html>
  );
}
