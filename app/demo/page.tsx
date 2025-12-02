import { Marquee, MarqueeItem } from "@/registry/ui/marquee"
import { Card, CardContent } from "@/registry/ui/card"

export default function MarqueeDemo() {
  const reviews = [
    {
      name: "山田太郎",
      username: "@yamada",
      body: "このサービスは本当に素晴らしいです！使いやすくて気に入っています。",
      img: "https://avatar.vercel.sh/yamada",
    },
    {
      name: "佐藤花子",
      username: "@sato",
      body: "デザインがとても綺麗で、機能も充実しています。",
      img: "https://avatar.vercel.sh/sato",
    },
    {
      name: "鈴木一郎",
      username: "@suzuki",
      body: "パフォーマンスも良好で、ストレスなく使えます。",
      img: "https://avatar.vercel.sh/suzuki",
    },
    {
      name: "田中美咲",
      username: "@tanaka",
      body: "サポートも迅速で、安心して利用できます。",
      img: "https://avatar.vercel.sh/tanaka",
    },
    {
      name: "伊藤健太",
      username: "@ito",
      body: "コストパフォーマンスが高く、おすすめです。",
      img: "https://avatar.vercel.sh/ito",
    },
  ]

  const technologies = [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Radix UI",
    "Framer Motion",
  ]

  const announcements = [
    { icon: "🎉", text: "新機能リリース!" },
    { icon: "⭐", text: "期間限定セール開催中" },
    { icon: "🚀", text: "パフォーマンス向上" },
    { icon: "💎", text: "プレミアムプラン登場" },
    { icon: "🔥", text: "人気急上昇中" },
  ]

  return (
    <div className="flex flex-col gap-12 p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Marquee コンポーネント</h1>
        <p className="text-muted-foreground mb-8">
          スクロールするコンテンツを表示するマーキーコンポーネントのデモ
        </p>
      </div>

      {/* 基本的な使い方 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">基本的な使い方</h2>
        <p className="text-sm text-muted-foreground mb-4">
          カードを使用したレビュー表示。ホバーで一時停止します。
        </p>
        <Marquee pauseOnHover className="[--duration:20s]">
          {reviews.map((review) => (
            <MarqueeItem key={review.username}>
              <Card className="w-[350px]">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="size-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.username}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">{review.body}</p>
                </CardContent>
              </Card>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>

      {/* フェードエフェクト */}
      <div>
        <h2 className="text-2xl font-bold mb-4">フェードエフェクト</h2>
        <p className="text-sm text-muted-foreground mb-4">
          両端にグラデーションを適用して、自然なスクロール表示を実現。
        </p>
        <Marquee fade pauseOnHover className="[--duration:15s]">
          {announcements.map((item, i) => (
            <MarqueeItem key={i} className="text-xl font-bold">
              {item.icon} {item.text}
            </MarqueeItem>
          ))}
        </Marquee>
      </div>

      {/* 逆方向スクロール */}
      <div>
        <h2 className="text-2xl font-bold mb-4">逆方向スクロール</h2>
        <p className="text-sm text-muted-foreground mb-4">
          右から左へスクロールする代わりに、左から右へスクロールします。
        </p>
        <Marquee reverse pauseOnHover className="[--duration:18s]">
          {technologies.map((tech, i) => (
            <MarqueeItem key={i}>
                {tech}
            </MarqueeItem>
          ))}
        </Marquee>
      </div>

      {/* 2段組み（上下逆方向） */}
      <div>
        <h2 className="text-2xl font-bold mb-4">2段組み（上下逆方向）</h2>
        <p className="text-sm text-muted-foreground mb-4">
          複数のマーキーを組み合わせて、動的な表示を実現。
        </p>
        <div className="flex flex-col gap-4">
          <Marquee pauseOnHover className="[--duration:20s]">
            {reviews.slice(0, 3).map((review) => (
              <MarqueeItem key={review.username}>
                <Card className="w-[350px]">
                  <CardContent className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.img}
                        alt={review.name}
                        className="size-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{review.body}</p>
                  </CardContent>
                </Card>
              </MarqueeItem>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {reviews.slice(2, 5).map((review) => (
              <MarqueeItem key={review.username}>
                <Card className="w-[350px]">
                  <CardContent className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.img}
                        alt={review.name}
                        className="size-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{review.body}</p>
                  </CardContent>
                </Card>
              </MarqueeItem>
            ))}
          </Marquee>
        </div>
      </div>

      {/* 垂直スクロール */}
      <div>
        <h2 className="text-2xl font-bold mb-4">垂直スクロール</h2>
        <p className="text-sm text-muted-foreground mb-4">
          縦方向にスクロールするマーキー。サイドバーやお知らせ欄に最適。
        </p>
        <Marquee vertical pauseOnHover className="h-[400px] [--duration:15s]">
          {reviews.map((review) => (
            <MarqueeItem key={review.username}>
              <Card className="w-[400px]">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="size-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.username}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">{review.body}</p>
                </CardContent>
              </Card>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>

      {/* シンプルなテキスト */}
      <div>
        <h2 className="text-2xl font-bold mb-4">シンプルなテキスト</h2>
        <p className="text-sm text-muted-foreground mb-4">
          シンプルなテキストベースのお知らせバー。
        </p>
        <div className="bg-slate-900 text-white py-4 rounded-lg">
          <Marquee pauseOnHover className="[--duration:12s]">
            {announcements.map((item, i) => (
              <MarqueeItem key={i} className="text-lg font-bold">
                {item.icon} {item.text}
              </MarqueeItem>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}
