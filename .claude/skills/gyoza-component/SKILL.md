---
name: gyoza-component
description: |
  指定されたReactコンポーネントファイルをGyoza UIのコンポーネントとして登録するスキル。
  コンポーネントファイルの配置、registry.jsonへの登録、MDXドキュメント作成、meta.jsonの更新、レジストリビルドまでを一貫して行う。
  ユーザーが「コンポーネントを追加」「Gyoza UIに登録」「新しいUIコンポーネントを作って」「このファイルをGyoza UIに入れたい」などと言ったときに使用する。
  .tsxファイルを指定された場合や、Gyoza UIプロジェクト内でコンポーネントの追加・登録作業が発生した場合にもトリガーする。
---

# Gyoza UI コンポーネント登録スキル

指定されたReactコンポーネント/フックファイルをGyoza UIライブラリに登録する。以下の手順を順に実行すること。

## 前提知識

Gyoza UIはshadcn/uiのレジストリシステムをベースにしたReactコンポーネントライブラリ。
- コンポーネントはネイティブHTML要素ベース（Radix UI不使用）
- Tailwind CSS v4でスタイリング
- `cn()` ユーティリティ（clsx + tailwind-merge）でクラス名を結合
- Fumadocs MDXでドキュメント管理
- 日本語サイト

## 手順

### Step 1: ファイルの確認と配置

1. ユーザーが指定したファイルを読み込み、構造を理解する
2. 以下の3タイプからどれに該当するか判断する：

| タイプ | 配置先 | registry type | 用途 |
|--------|--------|---------------|------|
| **UIコンポーネント** | `registry/ui/<name>.tsx` | `registry:ui` | 単体の汎用UI部品（button, accordion等） |
| **ブロック** | `registry/blocks/<name>/<name>.tsx` | `registry:component` | 複数のUIコンポーネントを組み合わせた複合コンポーネント（form, sign-in-card等）。ページ・lib・hookなど複数ファイルを含む場合もある |
| **フック** | `registry/hooks/<name>.ts` | `registry:hook` | カスタムReact hook（use-postal-code等） |

3. ファイルが既にregistry配下にない場合は、適切な場所にコピーまたは移動する
4. **UIコンポーネント・ブロックの場合のみ**、以下のGyoza UIパターンに従っているか確認し、必要に応じて調整する：
   - `React.forwardRef` でref転送
   - `.displayName` の設定
   - `cn()` によるクラス名結合（`import { cn } from "@/lib/utils"` を使用）
   - HTML属性のスプレッド（`...props`）
   - 適切なexport文

### Step 2: registry.json への登録

`registry.json` の `items` 配列に新しいエントリを追加する。Step 1で判断したタイプに応じて `type` と `files[].path` を設定する。

**UIコンポーネントの場合：**
```json
{
  "name": "<name>",
  "type": "registry:ui",
  "title": "<Title>",
  "description": "<説明文>",
  "dependencies": ["lucide-react"],
  "files": [{ "path": "registry/ui/<name>.tsx", "type": "registry:ui" }]
}
```

**ブロックの場合：**
```json
{
  "name": "<name>",
  "type": "registry:component",
  "title": "<Title>",
  "description": "<説明文>",
  "dependencies": ["zod"],
  "registryDependencies": ["button", "input", "card"],
  "files": [
    { "path": "registry/blocks/<name>/<name>.tsx", "type": "registry:component" },
    { "path": "registry/blocks/<name>/hooks/use-xxx.ts", "type": "registry:hook" },
    { "path": "registry/blocks/<name>/lib/xxx.ts", "type": "registry:lib" }
  ]
}
```

**フックの場合：**
```json
{
  "name": "<name>",
  "type": "registry:hook",
  "title": "<Title>",
  "description": "<説明文>",
  "files": [{ "path": "registry/hooks/<name>.ts", "type": "registry:hook" }]
}
```

**注意点：**
- `name` はケバブケース（例: `date-picker`, `use-postal-code`）
- `dependencies` は外部npmパッケージのみ（例: `lucide-react`, `zod`）。不要なら省略
- `registryDependencies` は他のGyoza UIコンポーネント名（例: `button`, `input`）。不要なら省略

### Step 3: MDXドキュメントの作成（UIコンポーネント・ブロックのみ）

フックの場合はこのステップをスキップする。

`content/docs/components/<name>.mdx` を作成する。ブロックも同じく `content/docs/components/` 配下に置く。

以下のテンプレートに従う。import pathはタイプに応じて変える：
- UIコンポーネント: `@/registry/ui/<name>`
- ブロック: `@/registry/blocks/<name>/<name>`

```mdx
---
title: <Component Title>
description: <コンポーネントの説明文（registry.jsonと同じ）>
---

import { <ExportedComponents> } from "@/registry/ui/<name>"
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';

<div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
  {/* ここにコンポーネントのライブプレビューを記述 */}
  {/* 実際の使用例として意味のあるデモを作る */}
</div>

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

\```bash
npx shadcn@latest add https://gyoza-ui.reichima.com/r/<name>.json
\```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

\```tsx
{/* ここにコンポーネントのソースコード全体を貼り付ける */}
\```

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</Tabs>

## Usage

\```tsx
import { <ExportedComponents> } from "@/components/ui/<name>"
\```

\```tsx
{/* 基本的な使用例のJSXコード */}
\```
```

**Usageのimportパスについて：**
- UIコンポーネント: `@/components/ui/<name>`
- ブロック: `@/components/<name>`

**プレビューセクションのポイント：**
- コンポーネントの特徴が一目でわかるデモにする
- `<div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">` でラップする
- インタラクティブな要素があればそれが体験できるようにする

### Step 4: meta.json の更新（UIコンポーネント・ブロックのみ）

フックの場合はこのステップをスキップする。

既存のコンポーネントとアルファベット順になるよう適切な位置に挿入する。

### Step 5: レジストリビルド

```bash
pnpm registry:build
```

を実行して `public/r/<name>.json` を生成する。

### Step 6: 確認

以下を確認して完了を報告する：
- コンポーネントファイルが適切な場所に存在する（`registry/ui/`, `registry/blocks/`, または `registry/hooks/`）
- `registry.json` にエントリが追加されている
- UIコンポーネント・ブロックの場合：
  - `content/docs/components/<name>.mdx` が作成されている
  - `content/docs/meta.json` に追加されている
- `public/r/<name>.json` が生成されている

## よくあるパターン

### 外部アイコンを使うコンポーネント
`lucide-react` からインポートし、`dependencies` に `"lucide-react"` を追加する。

### 他のGyoza UIコンポーネントに依存するコンポーネント
`registryDependencies` にそのコンポーネント名を記載する（例: `["button", "input"]`）。

### 複数ファイルで構成されるコンポーネント
ブロックコンポーネントとして `registry/blocks/<name>/` ディレクトリに配置し、`files` 配列に全ファイルを記載する。
