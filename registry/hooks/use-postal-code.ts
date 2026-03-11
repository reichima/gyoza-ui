"use client"

import { useCallback, useState } from "react"

interface PostalCodeResult {
  address: string
  error: boolean
}

export const usePostalCode = () => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchAddress = useCallback(async (postalCode: string): Promise<PostalCodeResult> => {
    // ハイフンを除去して7桁の数字かチェック
    const cleanedCode = postalCode.replace(/-/g, "")
    if (!/^\d{7}$/.test(cleanedCode)) {
      return { address: "", error: false }
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanedCode}`
      )
      const result = await response.json()

      if (result.status === 200 && result.results) {
        const addressData = result.results[0]
        const fullAddress = `${addressData.address1}${addressData.address2}${addressData.address3}`
        return { address: fullAddress, error: false }
      }
      return { address: "", error: false }
    } catch (error) {
      console.error("Failed to fetch address:", error)
      return { address: "", error: true }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { fetchAddress, isLoading }
}
