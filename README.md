# Gyoza UI

shadcn/ui ベースのカスタムコンポーネントレジストリです。

https://reichima.github.io/gyoza-ui

## コンポーネントのインストール

任意のプロジェクトから `shadcn` CLI でコンポーネントを追加できます。

```bash
npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/<コンポーネント名>.json
```

### 利用可能なコンポーネント

| コンポーネント | コマンド |
|---|---|
| Button | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/button.json` |
| Card | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/card.json` |
| Input | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/input.json` |
| Label | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/label.json` |
| Textarea | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/textarea.json` |
| Select | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/select.json` |
| Dialog | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/dialog.json` |
| Accordion | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/accordion.json` |
| Combobox | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/combobox.json` |
| Popover | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/popover.json` |
| Tooltip | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/tooltip.json` |
| Sign In Card | `npx shadcn@latest add https://reichima.github.io/gyoza-ui/r/sign-in-card.json` |

## 開発

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev
```

### コード品質

[Biome](https://biomejs.dev/) を使用しています。

```bash
pnpm format        # フォーマット
pnpm format:check  # フォーマットチェック
pnpm lint:biome    # リント
pnpm check         # フォーマット + リント
pnpm check:fix     # 自動修正
```

## ビルド・デプロイ

### レジストリのビルド

`registry.json` からコンポーネントJSONを `public/r/` に生成します。

```bash
pnpm registry:build
```

### 静的ビルド

```bash
pnpm build
```

### デプロイ

`main` ブランチにプッシュすると GitHub Actions で自動デプロイされます。

手動デプロイは GitHub の Actions タブから「Run workflow」で実行できます。

> GitHub リポジトリの Settings > Pages で Source を「GitHub Actions」に設定してください。

## 技術スタック

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) v4
- [shadcn/ui](https://ui.shadcn.com/) レジストリ
- [fumadocs](https://fumadocs.vercel.app/) ドキュメント
- [GitHub Pages](https://pages.github.com/) ホスティング
