import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.ComponentProps<"div"> {
  /**
   * マーキーのスクロール方向
   * @default "left"
   */
  direction?: "left" | "right" | "up" | "down"
  /**
   * マーキーのスクロール速度（秒）
   * @default 30
   */
  duration?: number
  /**
   * マーキーを一時停止するかどうか
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * マーキーを一時停止するかどうか
   * @default false
   */
  pauseOnFocus?: boolean
  /**
   * マーキーの繰り返し回数
   * @default 2
   */
  repeat?: number
  /**
   * マーキーを逆方向にスクロールするかどうか
   * @default false
   */
  reverse?: boolean
  /**
   * マーキーの垂直方向の設定
   * @default false
   */
  vertical?: boolean
  /**
   * グラデーションを表示するかどうか
   * @default false
   */
  fade?: boolean
  /**
   * ユーザーがアクセシビリティ設定で「motion: reduce」を選択している場合、アニメーションを無効化
   * @default true
   */
  respectReducedMotion?: boolean
}

function Marquee({
  className,
  direction = "left",
  duration = 30,
  pauseOnHover = false,
  pauseOnFocus = false,
  repeat = 2,
  reverse = false,
  vertical = false,
  fade = false,
  respectReducedMotion = true,
  children,
  style,
  ...props
}: MarqueeProps) {
  // 方向の決定
  const isVertical = vertical || direction === "up" || direction === "down"
  const isReverse =
    reverse ||
    direction === "right" ||
    direction === "down"

  return (
    <div
      data-slot="marquee"
      className={cn(
        "group relative flex overflow-hidden",
        isVertical ? "flex-col" : "flex-row",
        fade &&
          (isVertical
            ? "[mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]"
            : "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"),
        className
      )}
      role="region"
      aria-label="スクロールコンテンツ"
      aria-live="off"
      style={
        {
          "--duration": `${duration}s`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex shrink-0",
            isVertical ? "flex-col animate-[marquee-vertical_var(--duration)_linear_infinite]" : "flex-row animate-[marquee_var(--duration)_linear_infinite]",
            isReverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            pauseOnFocus && "group-focus-within:[animation-play-state:paused]",
            respectReducedMotion && "motion-reduce:animate-none"
          )}
          aria-hidden={index > 0 ? "true" : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

function MarqueeItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="marquee-item"
      className={cn("shrink-0 px-2", className)}
      {...props}
    />
  )
}

export { Marquee, MarqueeItem, type MarqueeProps }
