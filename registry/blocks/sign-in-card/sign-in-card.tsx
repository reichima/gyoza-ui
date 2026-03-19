"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Button } from "@/registry/ui/button"
import { z } from "zod"

const signInSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
})

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function SignInCard() {
  const [pending, setPending] = React.useState(false)
  const [errors, setErrors] = React.useState<{
    email?: string
    password?: string
  }>({})

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setPending(true)
      setErrors({})

      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())
      const result = signInSchema.safeParse(data)

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        })
        setPending(false)
        return
      }

      // ここでログイン処理を実装
      setPending(false)
    },
    []
  )

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">ログイン</CardTitle>
        </CardHeader>
        <div className="px-6">
          <hr className="border-border" />
        </div>
        <CardContent className="flex flex-col gap-4 pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div
              className="group/field grid gap-2"
              data-invalid={!!errors.email}
            >
              <Label
                htmlFor="email"
                className="group-data-[invalid=true]/field:text-destructive"
              >
                メールアドレス
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="メールアドレスを入力してください"
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={pending}
                aria-invalid={!!errors.email}
                aria-errormessage="error-email"
              />
              {errors.email && (
                <p id="error-email" className="text-destructive text-sm">
                  {errors.email}
                </p>
              )}
            </div>
            <div
              className="group/field grid gap-2"
              data-invalid={!!errors.password}
            >
              <Label
                htmlFor="password"
                className="group-data-[invalid=true]/field:text-destructive"
              >
                パスワード
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="パスワードを入力してください"
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={pending}
                aria-invalid={!!errors.password}
                aria-errormessage="error-password"
              />
              {errors.password && (
                <p id="error-password" className="text-destructive text-sm">
                  {errors.password}
                </p>
              )}
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={pending}>
              {pending ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
          <div className="px-0">
            <hr className="border-border" />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              disabled={pending}
            >
              <GoogleIcon className="mr-2 size-5" />
              Googleログイン
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              disabled={pending}
            >
              <GitHubIcon className="mr-2 size-5" />
              GitHubログイン
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
