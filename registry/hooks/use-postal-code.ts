"use client"

import { useCallback, useRef, useState } from "react"

interface PostalCodeResult {
  address: string
  error: boolean
}

export const usePostalCode = () => {
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchAddress = useCallback(async (postalCode: string): Promise<PostalCodeResult> => {
    // ハイフンを除去して7桁の数字かチェック
    const cleanedCode = postalCode.replace(/-/g, "")
    if (!/^\d{7}$/.test(cleanedCode)) {
      return { address: "", error: false }
    }

    // 前回のリクエストが進行中であればキャンセルする
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanedCode}`,
        { signal: controller.signal }
      )
      const result = await response.json()

      if (result.status === 200 && result.results) {
        const addressData = result.results[0]
        const fullAddress = `${addressData.address1}${addressData.address2}${addressData.address3}`
        return { address: fullAddress, error: false }
      }
      return { address: "", error: false }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return { address: "", error: false }
      }
      console.error("Failed to fetch address:", error)
      return { address: "", error: true }
    } finally {
      // キャンセルされていない（=最新の）リクエストのみ isLoading を解除する
      if (!controller.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [])

  return { fetchAddress, isLoading }
}
