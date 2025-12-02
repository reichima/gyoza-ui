import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gyoza UI - 餃子のように包み込む、優しいUIコンポーネントライブラリ",
  description: "システム開発のために設計された、ヘッドレスでアクセシブルなReactコンポーネントライブラリ。あなたのプロジェクトを優しく包み込みます。",
  keywords: [
    "Gyoza UI",
    "Gyoza",
    "UIコンポーネント",
    "Reactコンポーネント",
    "ヘッドレスコンポーネント",
    "アクセシブルUI"
  ],
  openGraph: {
    title: "Gyoza UI",
    description: "システム開発のために設計された、ヘッドレスでアクセシブルなReactコンポーネントライブラリ。あなたのプロジェクトを優しく包み込みます。",
    siteName: "Gyoza UI",
    type: "website",
    url: "https://gyoza-ui.reichima.com/",
    images: [
      {
        url: "https://gyoza-ui.reichima.com/gyoza.png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Gyoza UI",
    description: "システム開発のために設計された、ヘッドレスでアクセシブルなReactコンポーネントライブラリ。あなたのプロジェクトを優しく包み込みます。",
    images: "https://gyoza-ui.reichima.com/gyoza.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
