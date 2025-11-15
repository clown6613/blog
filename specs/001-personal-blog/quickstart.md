# クイックスタートガイド: 個人ブログサイト（GitHub Pages版）

**最終更新**: 2025-11-16
**技術スタック**: Astro + TypeScript + Tailwind CSS
**ホスティング**: GitHub Pages（完全無料）

## 前提条件

開発を開始する前に、以下がインストールされていることを確認してください:

- **Node.js**: v18以上（推奨: v20 LTS）
  - 確認: `node --version`
  - ダウンロード: https://nodejs.org/
- **pnpm**: v8以上（推奨）または npm
  - インストール: `npm install -g pnpm`
  - 確認: `pnpm --version`
- **Git**: バージョン管理用
  - 確認: `git --version`
- **VS Code**（推奨エディタ）
  - Astro公式拡張機能をインストール: `Astro`

## プロジェクトセットアップ

### 1. 新規Astroプロジェクトの作成

```bash
# プロジェクトディレクトリに移動
cd /Users/s23410/Desktop/blog

# Astroプロジェクトを初期化（カレントディレクトリに）
pnpm create astro@latest . --template minimal --typescript strictest --install --git no
```

**オプション説明**:
- `.`: カレントディレクトリにインストール
- `--template minimal`: 最小構成テンプレート
- `--typescript strictest`: TypeScript最厳格モード
- `--install`: 依存関係を自動インストール
- `--git no`: Gitは既に初期化済みのため

### 2. 必要な依存関係をインストール

```bash
# Tailwind CSS
pnpm astro add tailwind

# Markdownプラグイン
pnpm add @astrojs/markdown-remark remark-gfm

# Pagefind（検索機能）
pnpm add -D pagefind

# 日付フォーマット
pnpm add date-fns

# 型定義
pnpm add -D @types/node
```

### 3. プロジェクト構造を作成

```bash
# コンテンツディレクトリ
mkdir -p src/content/posts
mkdir -p src/constants
mkdir -p src/layouts
mkdir -p src/components
mkdir -p public/images

# サンプル記事を作成
touch src/content/posts/.gitkeep
```

### 4. Astro設定ファイルを更新（GitHub Pages対応）

`astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    remarkPlugins: ['remark-gfm']
  },
  // GitHub Pages設定
  site: 'https://username.github.io', // GitHubユーザー名に変更
  base: '/blog', // リポジトリ名に変更（ユーザーページの場合は削除）
});
```

**重要**:
- `site`: GitHubユーザー名を使用（例: `https://s23410.github.io`）
- `base`: リポジトリ名を使用（例: `/blog`）
- ユーザーページ形式（`username.github.io`リポジトリ）の場合は`base`設定不要

### 5. Content Collections設定

`src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(200),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    pubDate: z.date(),
    published: z.boolean(),
    category: z.enum(['tech', 'hobby']),
    description: z.string().max(300).optional(),
    tags: z.array(z.string().max(50)).max(10).optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
```

### 6. カテゴリ定義ファイルを作成

`src/constants/categories.ts`:

```typescript
export type CategoryId = 'tech' | 'hobby';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  tech: {
    id: 'tech',
    name: '技術',
    description: 'プログラミング、開発、技術に関する記事',
    icon: '💻'
  },
  hobby: {
    id: 'hobby',
    name: '趣味',
    description: '趣味、日常、その他の記事',
    icon: '🎨'
  }
};
```

### 7. .nojekyllファイルを作成（GitHub Pages用）

```bash
# publicディレクトリに.nojekyllファイルを作成
touch public/.nojekyll
```

このファイルは、GitHub PagesがJekyllとしてサイトを処理するのを防ぎ、`_astro`ディレクトリが正しく配信されるようにします。

### 8. GitHub Actions設定ファイルを作成

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  # mainブランチへのpushでデプロイ
  push:
    branches: [ main ]
  # 手動トリガーも可能
  workflow_dispatch:

# GitHub Pagesへのデプロイ権限
permissions:
  contents: read
  pages: write
  id-token: write

# 同時実行を1つに制限（デプロイの競合を防ぐ）
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build with Astro
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**注**: Astro公式Action（`withastro/action@v5`）を使用する簡略版も可能ですが、上記の方が各ステップが明確です。

### 9. サンプル記事を作成

`src/content/posts/2025-01-15-welcome.md`:

```markdown
---
title: "ブログを始めました"
slug: "welcome"
pubDate: 2025-01-15
published: true
category: "tech"
description: "個人ブログの開設記事です"
tags: ["お知らせ", "ブログ"]
---

# ブログを始めました

このブログでは技術的な内容や趣味について書いていきます。

## コードの例

\`\`\`typescript
const greeting = (name: string) => {
  return `Hello, ${name}!`;
};

console.log(greeting('World'));
\`\`\`

よろしくお願いします！
```

## 開発サーバーの起動

```bash
# 開発サーバーを起動
pnpm dev

# ブラウザで以下にアクセス
# http://localhost:4321
```

**開発サーバーの機能**:
- ホットリロード（ファイル変更を自動検知）
- TypeScript型チェック
- Tailwind CSSの自動コンパイル

## ビルドとプレビュー

```bash
# 本番用ビルド
pnpm build

# ビルドされたサイトをプレビュー
pnpm preview
```

ビルドされたファイルは `dist/` ディレクトリに生成されます。

## 記事の作成ワークフロー

### 新しい記事を書く

1. `src/content/posts/` に新しいMarkdownファイルを作成
   - 命名規則: `YYYY-MM-DD-slug.md`
   - 例: `2025-01-20-typescript-tips.md`

2. フロントマターを記入:

```markdown
---
title: "TypeScriptの便利なTips"
slug: "typescript-tips"
pubDate: 2025-01-20
published: false          # 下書きはfalse
category: "tech"
description: "TypeScriptの開発で役立つTipsをまとめました"
tags: ["TypeScript", "プログラミング"]
image: "/images/typescript-tips.jpg"  # オプション
---

記事本文をここに書く...
```

3. 下書きとして保存（`published: false`）
4. 記事を完成させたら `published: true` に変更
5. 開発サーバーで確認
6. Gitにコミット&プッシュ

### 画像の追加

1. 画像を `public/images/` に配置
2. Markdownから参照:

```markdown
![代替テキスト](/images/my-image.jpg)
```

## Pagefind検索の統合

### 1. ビルド後スクリプトを追加

`package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --source dist",
    "preview": "astro preview"
  }
}
```

### 2. 検索UIコンポーネントを追加

`src/components/Search.astro`:

```html
---
---

<div id="search"></div>

<link href="/_pagefind/pagefind-ui.css" rel="stylesheet">
<script is:inline src="/_pagefind/pagefind-ui.js"></script>
<script is:inline>
  window.addEventListener('DOMContentLoaded', () => {
    new PagefindUI({
      element: "#search",
      showSubResults: true,
      translations: {
        placeholder: "記事を検索...",
        clear_search: "クリア",
        load_more: "さらに読み込む",
        search_label: "このサイトを検索",
        filters_label: "フィルター",
        zero_results: "検索結果が見つかりませんでした: [SEARCH_TERM]",
        many_results: "[COUNT]件の結果が見つかりました: [SEARCH_TERM]",
        one_result: "1件の結果が見つかりました: [SEARCH_TERM]",
      }
    });
  });
</script>
```

## デプロイ（GitHub Pages）

### GitHubリポジトリの準備

1. GitHubで新しいリポジトリを作成:
   - リポジトリ名: `blog`（またはプロジェクト名）
   - Public（GitHub Pages無料利用のため）
   - READMEなどは追加しない

2. ローカルリポジトリをGitHubにプッシュ:

```bash
# リモートリポジトリを追加
git remote add origin https://github.com/username/blog.git

# メインブランチにpush
git add .
git commit -m "Initial blog setup with Astro for GitHub Pages"
git push -u origin main
```

### GitHub Pages設定

1. GitHubリポジトリページで **Settings** → **Pages** に移動

2. **Source** セクションで:
   - **Source**: "GitHub Actions" を選択
   - （従来の "Deploy from a branch" は選択しない）

3. 設定を保存

### 初回デプロイ

上記の設定完了後、mainブランチへのpushで自動的にデプロイが開始されます:

```bash
git push origin main
```

### デプロイ状況の確認

1. GitHubリポジトリの **Actions** タブでワークフロー実行状況を確認
2. ビルドとデプロイが完了すると、緑色のチェックマークが表示
3. **Settings** → **Pages** でサイトURLを確認:
   - 例: `https://username.github.io/blog/`

### 自動デプロイ

以降、mainブランチへのpushで自動的にデプロイされます:

```bash
git add .
git commit -m "Add new blog post"
git push origin main
```

**デプロイ時間**: 通常2-5分（ビルド＋デプロイ）

### カスタムドメイン設定（オプション）

独自ドメインを使用する場合:

1. **Settings** → **Pages** → **Custom domain**
2. ドメイン名を入力（例: `blog.example.com`）
3. DNSレコードを設定:
   - **Aレコード** または **CNAMEレコード** をDNSプロバイダーで追加
   - GitHub公式ドキュメント参照: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

4. **Enforce HTTPS** を有効化（Let's Encryptで自動証明書発行）

### ユーザーページ形式（オプション）

リポジトリ名を `username.github.io` にすると、よりシンプルなURLになります:

- URL: `https://username.github.io/`（`/blog`不要）
- `astro.config.mjs` の `base` 設定を削除

## トラブルシューティング

### ポート4321が既に使用中

```bash
# 別のポートで起動
pnpm dev --port 3000
```

### ビルドエラー: 型不一致

```bash
# TypeScriptの型チェックを実行
pnpm astro check
```

### Pagefindが検索インデックスを生成しない

```bash
# 手動でPagefindを実行
pnpm run build
npx pagefind --source dist
```

### 画像が表示されない

- パスが `/images/...` で始まることを確認（`base`設定がある場合は`/blog/images/...`）
- `public/images/` に画像ファイルが存在することを確認
- ビルド後、`dist/images/` にコピーされていることを確認

### GitHub Pagesでサイトが表示されない

```bash
# .nojekyllファイルが存在することを確認
ls -la public/.nojekyll

# astro.config.mjsでsite/base設定を確認
cat astro.config.mjs

# GitHub Actions権限を確認
# Settings → Actions → General → Workflow permissions
# "Read and write permissions" が有効であることを確認
```

### GitHub Actionsビルドが失敗する

1. **Actions** タブでエラーログを確認
2. ローカルで `pnpm build` が成功することを確認
3. `package.json` の `engines` フィールドでNode.jsバージョンを指定:

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### CSSやJSが404エラー

- `base` 設定がリポジトリ名と一致しているか確認
- プロジェクトページ形式（`/blog`）とユーザーページ形式（`/`）を混同していないか確認

## 推奨VS Code拡張機能

- **Astro** (`astro-build.astro-vscode`): Astroファイルのシンタックスハイライトと IntelliSense
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Tailwind クラス名の自動補完
- **Prettier - Code formatter** (`esbenp.prettier-vscode`): コードフォーマッター
- **ESLint** (`dbaeumer.vscode-eslint`): TypeScript/JavaScript リンター

## パフォーマンス最適化

### 画像最適化

Astro Image コンポーネントを使用:

```astro
---
import { Image } from 'astro:assets';
import myImage from '../images/my-image.jpg';
---

<Image src={myImage} alt="説明" width={800} height={600} />
```

### ページネーション（記事が50件以上の場合）

`src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => data.published);
const pageSize = 10;
const currentPage = 1;
const paginatedPosts = posts.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);
---
```

## 次のステップ

1. **Phase 1完了後**: `/speckit.tasks` コマンドで実装タスクリストを生成
2. **カテゴリページの実装**: `src/pages/category/[category].astro`
3. **タグページの実装**: `src/pages/tags/[tag].astro`
4. **検索機能の統合**: Pagefind UIの追加
5. **ダークモード対応**: Tailwind CSS Dark Mode設定

## 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build/)
- [Astro + GitHub Pagesガイド](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages公式ドキュメント](https://docs.github.com/pages)
- [GitHub Actions公式ドキュメント](https://docs.github.com/actions)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [Pagefind公式ドキュメント](https://pagefind.app/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)

## サポート

問題が発生した場合:
1. Astro Discord: https://astro.build/chat
2. GitHub Issues: プロジェクトリポジトリのIssuesセクション
3. Stack Overflow: `[astro]` タグで質問
