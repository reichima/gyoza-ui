import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
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
    <html lang="ja" suppressHydrationWarning>
      <body className={`${zenMaruGothic.variable} font-zen-maru`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
