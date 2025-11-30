import * as React from "react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">
            <Image
              src="/gyoza.png"
              alt="Gyoza UIのロゴ"
              width={48}
              height={48}
              className="inline-block"
            />
            Gyoza UI
          </div>
          <nav>
            <ul className="flex gap-6 text-sm font-medium">
              <li><Link href="/docs" className="hover:text-slate-600 transition-colors">ドキュメント</Link></li>
              <li><Link href="https://github.com/reichima/gyoza-ui" className="hover:text-slate-600 transition-colors">GitHub</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                餃子のように包み込む、<br className="hidden md:block" />
                <span className="text-slate-600">優しいUIコンポーネント</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                システム開発のために設計された、ヘッドレスでアクセシブルなReactコンポーネントライブラリ。
                あなたのプロジェクトを優しく包み込みます。
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                >
                  はじめる
                </Link>
                <Link
                  href="https://github.com/reichima/gyoza-ui"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                >
                  GitHub
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              {/* 仮画像: ヒーローイメージ */}
              <img
                src="/gyoza.png"
                alt="Gyoza UIのコンセプトイメージ"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">
              システム開発に寄り添う特徴
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="mb-6">
                  {/* 仮画像: アイコン */}
                  <img
                    src="https://placehold.jp/150x150.png"
                    alt="ヘッドレス設計のイメージ"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">ヘッドレス設計</h3>
                <p className="text-slate-600 leading-relaxed">
                  スタイルを持たないヘッドレスコンポーネントとして提供。
                  Tailwind CSSはもちろん、CSS Modulesへの置き換えもスムーズに行えます。
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="mb-6">
                  {/* 仮画像: アイコン */}
                  <img
                    src="https://placehold.jp/150x150.png"
                    alt="システム仕様のイメージ"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">システム仕様前提</h3>
                <p className="text-slate-600 leading-relaxed">
                  業務システムに必要な堅牢さと柔軟性を兼ね備えています。
                  複雑なフォームやデータ表示も、優しくサポートします。
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="mb-6">
                  {/* 仮画像: アイコン */}
                  <img
                    src="https://placehold.jp/150x150.png"
                    alt="アクセシビリティのイメージ"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">アクセシビリティ (a11y)</h3>
                <p className="text-slate-600 leading-relaxed">
                  WAI-ARIAに基づいた実装で、すべてのユーザーに優しい体験を提供。
                  キーボード操作やスクリーンリーダーにも標準対応しています。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Gyoza UI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
