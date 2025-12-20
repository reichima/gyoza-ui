"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TypingProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
	/**
	 * タイピング速度(ミリ秒)
	 * @default 100
	 */
	speed?: number
	/**
	 * タイピング開始前の遅延時間(秒)
	 * @default 0
	 */
	delay?: number
	/**
	 * カーソルを表示するかどうか
	 * @default true
	 */
	showCursor?: boolean
	/**
	 * カーソルのカスタムクラス名
	 */
	cursorClassName?: string
	/**
	 * タイピングアニメーションが完了したときのコールバック
	 */
	onComplete?: () => void
	/**
	 * 画面内に入ってからタイピングを開始するかどうか
	 * @default true
	 */
	startOnView?: boolean
	/**
	 * Intersection Observerのしきい値
	 * @default 0.1
	 */
	threshold?: number
}

const Typing = React.forwardRef<HTMLDivElement, TypingProps>(
	(
		{
			children,
			speed = 100,
			delay = 0,
			showCursor = true,
			cursorClassName,
			onComplete,
			startOnView = true,
			threshold = 0.1,
			className,
			...props
		},
		ref
	) => {
		const [displayedText, setDisplayedText] = React.useState<string>("")
		const [isDelayed, setIsDelayed] = React.useState<boolean>(delay > 0)
		const [isComplete, setIsComplete] = React.useState<boolean>(false)
		const [isInView, setIsInView] = React.useState<boolean>(!startOnView)
		const elementRef = React.useRef<HTMLDivElement>(null)

		const fixedText =
			typeof children === "string"
				? children
				: React.Children.toArray(children).join("")

		// Intersection Observer for viewport detection
		React.useEffect(() => {
			if (!startOnView) return

			const element = elementRef.current
			if (!element) return

			const observer = new IntersectionObserver(
				(entries) => {
					const [entry] = entries
					if (entry.isIntersecting && !isInView) {
						setIsInView(true)
					}
				},
				{
					threshold,
					rootMargin: "0px",
				}
			)

			observer.observe(element)

			return () => {
				observer.disconnect()
			}
		}, [startOnView, threshold, isInView])

		// Delay effect
		React.useEffect(() => {
			if (!isInView) return

			if (delay <= 0) {
				setIsDelayed(false)
				return
			}

			const delayTimeout = setTimeout(() => {
				setIsDelayed(false)
			}, delay * 1000)

			return () => clearTimeout(delayTimeout)
		}, [delay, isInView])

		// Typing effect
		React.useEffect(() => {
			if (!isInView || isDelayed) return

			if (displayedText.length < fixedText.length) {
				const typingTimeout = setTimeout(() => {
					setDisplayedText((prev) => prev + fixedText[displayedText.length])
				}, speed)

				return () => clearTimeout(typingTimeout)
			}

			if (displayedText.length === fixedText.length && !isComplete) {
				setIsComplete(true)
				onComplete?.()
			}
		}, [fixedText, displayedText, isDelayed, speed, isComplete, onComplete, isInView])

		// Combine refs
		React.useImperativeHandle(ref, () => elementRef.current as HTMLDivElement)

		return (
			<div
				ref={elementRef}
				className={cn("flex items-start", className)}
				role="status"
				aria-live="polite"
				aria-atomic="true"
				{...props}
			>
				<span className="whitespace-pre-wrap break-words">
					{displayedText}
				</span>
				{showCursor && (
					<span
						className={cn(
							"ml-0.5 inline-block w-[2px] bg-foreground h-6",
							!isComplete && "animate-[blink_1s_ease-in-out_infinite]",
							cursorClassName
						)}
						aria-hidden="true"
						style={{
							animationTimingFunction: "step-end",
							verticalAlign: "baseline",
						}}
					/>
				)}
			</div>
		)
	}
)

Typing.displayName = "Typing"

export { Typing }
