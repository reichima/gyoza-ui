import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Marquee, MarqueeItem } from "@/registry/ui/marquee"
import { GithubIcon } from "@/components/github-icon"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-soft-amber-50">
      {/* Header */}
      <header className="sticky top-4 mx-4 z-50 glass-warm rounded-2xl shadow-lg">
        <div className="px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-bold text-xl tracking-tight group">
            <Image
              src="/gyoza.png"
              alt="Gyoza UIのロゴ"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="text-soft-amber-600">Gyoza UI</span>
          </Link>
          <nav>
            <ul className="flex items-center gap-8 text-sm font-medium">
              <li>
                <Link href="/docs" className="link-warm py-2">
                  ドキュメント
                </Link>
              </li>
              <li>
                <Link href="/demo" className="link-warm py-2">
                  デモ
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/reichima/gyoza-ui" 
                  className="flex items-center gap-2 link-warm py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={18} />
                  GitHub
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-6rem)] flex flex-col relative overflow-hidden">
          <div className="flex-1 flex items-center py-16 md:py-24 relative z-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              {/* Hero Image */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-soft-amber-300 rounded-3xl blur-2xl opacity-40 scale-110" />
                  <Image
                    src="/gyoza.png"
                    alt="Gyoza UIのコンセプトイメージ"
                    width={400}
                    height={400}
                    className="relative rounded-3xl animate-float drop-shadow-2xl"
                  />
                </div>
              </div>
              
              {/* Hero Content */}
              <div className="flex-1 space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  餃子のように包み込む、
                  <br className="hidden md:block" />
                  <span className="text-soft-amber-600">優しいUIコンポーネント</span>
                </h1>
                
                <p className="text-lg text-soft-amber-800 max-w-xl leading-relaxed">
                  システム開発のために設計された、ヘッドレスでアクセシブルなReactコンポーネントライブラリ。
                  あなたのプロジェクトを優しく包み込みます。
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/docs"
                    className="btn-paper-green inline-flex items-center justify-center gap-2 text-base"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    はじめる
                  </Link>
                  <Link
                    href="/demo"
                    className="btn-outline-warm inline-flex items-center justify-center gap-2 text-base"
                  >
                    デモを見る
                  </Link>
                  <Link
                    href="https://github.com/reichima/gyoza-ui"
                    className="btn-outline-warm inline-flex items-center justify-center gap-2 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon size={20} />
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Wave Background */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <Image
              src="/wave.svg"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              aria-hidden="true"
            />
          </div>

          {/* Marquee Section */}
          <div className="py-6 overflow-hidden relative z-10 bg-soft-amber-200">
            <div className="container mx-auto px-6">
              <Marquee pauseOnHover className="[--duration:30s]" fade>
                <MarqueeItem>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full">
                    <span className="text-2xl">🥟</span>
                    <span className="text-sm font-semibold">Gyoza UI</span>
                  </div>
                </MarqueeItem>
                <MarqueeItem>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full">
                    <span className="text-2xl">🎨</span>
                    <span className="text-sm font-semibold">Tailwind</span>
                  </div>
                </MarqueeItem>
                <MarqueeItem>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full">
                    <span className="text-2xl">♿</span>
                    <span className="text-sm font-semibold">アクセシビリティ対応</span>
                  </div>
                </MarqueeItem>
              </Marquee>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative bg-soft-amber-200">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight section-header-warm">
                システム開発に寄り添う特徴
              </h2>
              <p className="mt-6 text-soft-amber-700 max-w-2xl mx-auto">
                業務システムの開発で必要とされる品質と柔軟性を追求しました
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card-warm p-8">
                <div className="icon-container-warm mb-6">
                  <svg className="w-8 h-8 text-soft-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-soft-amber-900">ヘッドレス設計</h3>
                <p className="text-soft-amber-700 leading-relaxed">
                  スタイルを持たないヘッドレスコンポーネントとして提供。
                  Tailwindでカスタマイズ可能です。
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card-warm p-8">
                <div className="icon-container-warm mb-6">
                  <svg className="w-8 h-8 text-soft-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-soft-amber-900">システム仕様前提</h3>
                <p className="text-soft-amber-700 leading-relaxed">
                  業務システムに必要な堅牢さと柔軟性を兼ね備えています。
                  複雑なフォームやデータ表示も、優しくサポートします。
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card-warm p-8">
                <div className="icon-container-warm mb-6">
                  <svg className="w-8 h-8 text-soft-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-soft-amber-900">アクセシビリティ (a11y)</h3>
                <p className="text-soft-amber-700 leading-relaxed">
                  WAI-ARIAに基づいた実装で、すべてのユーザーに優しい体験を提供。
                  キーボード操作やスクリーンリーダーにも標準対応しています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-soft-amber-400">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              あなたのプロジェクトを優しく包み込みましょう
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Gyoza UIで、アクセシブルで美しいUIを簡単に構築できます
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 bg-white text-soft-amber-700 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                ドキュメントを読む
              </Link>
              <Link
                href="https://github.com/reichima/gyoza-ui"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur text-white border-2 border-white/40 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={22} />
                GitHubで見る
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-soft-amber-100">
        <div className="container mx-auto px-6">
          <div className="separator-warm my-8" />
          
          <p className="text-center text-soft-amber-500 text-sm">
            &copy; {new Date().getFullYear()} Gyoza UI. Made with 🥟 and ❤️
          </p>
        </div>
      </footer>
    </div>
  )
}
