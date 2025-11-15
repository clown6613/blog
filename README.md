# 📝 ぴえろぐ

Tech と Life について、ぴえが綴る日々の記録

🔗 **本番サイト**: https://clown6613.github.io/blog/

---

## ✨ 機能

### 🎨 デザイン・UI
- ✅ **深緑カラーテーマ** - 落ち着いた配色
- ✅ **ダークモード** - 目に優しい夜間モード（🌙/☀️切り替え、localStorage保存）
- ✅ **レスポンシブデザイン** - スマホ・タブレット・PC対応（320px-1920px）
- ✅ **目次（TOC）** - 記事詳細ページに自動生成、サイドバー固定
- ✅ **読了時間表示** - 約○分で読めます（日本語400文字/分、英語200単語/分）

### 📚 コンテンツ機能
- ✅ **カテゴリ分類** - Tech 💻 / Life 🌿
- ✅ **タグ機能** - 記事を詳細に分類、自動ページ生成
- ✅ **全文検索** - Pagefind（静的検索、超高速、オフライン対応）
- ✅ **記事並び替え** - 新しい順/古い順（クライアントサイド）
- ✅ **関連記事表示** - 同じカテゴリ・タグの記事を推薦（スコアリング）
- ✅ **前の記事・次の記事** - 記事詳細ページ下部、日付順ナビゲーション
- ✅ **パンくずナビゲーション** - すべてのページ

### 🚀 SEO・パフォーマンス
- ✅ **RSSフィード** - `/rss.xml`でRSSリーダー購読可能
- ✅ **サイトマップ** - 自動生成、検索エンジン最適化
- ✅ **OGPメタタグ** - SNSシェア時の見た目改善（Twitter Card対応）
- ✅ **シンタックスハイライト** - Shiki（VS Code品質、200+言語対応）
- ✅ **静的サイト生成** - 高速読み込み（TTFB < 300ms目標）
- ✅ **Canonical URL** - 重複コンテンツ対策

### 📂 記事管理
- ✅ **ディレクトリ分け** - `tech/` と `hobby/` で整理
- ✅ **日付付きファイル名** - `YYYY-MM-DD-slug.md` で時系列管理
- ✅ **記事作成スクリプト** - CLI一発で新規記事作成
- ✅ **下書き機能** - `published: false` で非公開
- ✅ **Git管理** - バージョン管理、変更履歴追跡

---

## 🛠️ 技術スタック

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| **SSG** | [Astro](https://astro.build/) | 5.15.8 |
| **言語** | TypeScript | 5.x |
| **CSS** | [Tailwind CSS](https://tailwindcss.com/) | 3.4.18 |
| **検索** | [Pagefind](https://pagefind.app/) | 1.4.0 |
| **シンタックスハイライト** | Shiki | Astro内蔵 |
| **ホスティング** | GitHub Pages | 完全無料 |
| **CI/CD** | GitHub Actions | 自動デプロイ |

### 主要依存関係
- `@astrojs/rss` - RSSフィード生成
- `@astrojs/sitemap` - サイトマップ自動生成
- `date-fns` - 日付フォーマット（日本語対応）
- `remark-gfm` - GitHub Flavored Markdown

---

## 🚀 クイックスタート

### 前提条件

- **Node.js**: 18以上（推奨: 20 LTS）
- **pnpm**: 8以上
  ```bash
  npm install -g pnpm
  ```

### セットアップ

\`\`\`bash
# リポジトリをクローン
git clone https://github.com/clown6613/blog.git
cd blog

# 依存関係をインストール
pnpm install

# 開発サーバー起動
pnpm dev
# → http://localhost:4321/blog
\`\`\`

### コマンド

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | 開発サーバー起動（ホットリロード） |
| `pnpm build` | 本番ビルド（検索インデックス生成含む） |
| `pnpm preview` | ビルド結果をローカルプレビュー |
| `./scripts/new-post.sh "タイトル" tech` | 技術記事作成 |
| `./scripts/new-post.sh "タイトル" hobby` | Life記事作成 |

---

## ✍️ 記事の書き方

### 方法1: スクリプトで作成（推奨）

\`\`\`bash
# 技術記事
./scripts/new-post.sh "TypeScriptの便利なTips" tech

# Life記事
./scripts/new-post.sh "週末の過ごし方" hobby
\`\`\`

**自動的に行われること**:
- ✅ 今日の日付でファイル作成
- ✅ 適切なディレクトリに配置（`tech/` または `hobby/`）
- ✅ テンプレートを記入（タイトル、カテゴリ、日付）
- ✅ VS Codeで開く（オプション）

### 方法2: 手動で作成

\`\`\`bash
# ファイル作成
# Tech: src/content/posts/tech/2025-01-15-my-article.md
# Life: src/content/posts/hobby/2025-01-15-my-article.md
\`\`\`

\`\`\`markdown
---
title: "記事タイトル"
pubDate: 2025-01-15
published: true          # true: 公開、false: 下書き
category: "tech"         # "tech" または "hobby"
description: "記事の説明（SEO用、300文字以内）"
tags: ["タグ1", "タグ2"]  # 最大10個
image: "/images/cover.jpg"  # アイキャッチ画像（オプション）
---

# 記事タイトル

Markdown形式で本文を書きます。

## セクション

内容...

\`\`\`typescript
// コードブロック
const example = 'code';
\`\`\`
\`\`\`

詳しくは [docs/creating-posts.md](./docs/creating-posts.md) を参照。

### 公開・下書き切り替え

\`\`\`yaml
published: true   # 公開
published: false  # 下書き（サイトに表示されない）
\`\`\`

### 画像の追加

\`\`\`bash
# 1. 画像を配置
cp my-image.jpg public/images/

# 2. Markdownから参照
![説明](/images/my-image.jpg)
\`\`\`

---

## 🚢 デプロイ（GitHub Pages）

### 初回設定（完了済み）

1. GitHub Settings → Pages
2. Source: **「GitHub Actions」** を選択
3. リポジトリを **Public** に設定

### 記事を公開

\`\`\`bash
git add .
git commit -m "Add: 新しい記事"
git push origin main
\`\`\`

**2-5分後**に https://clown6613.github.io/blog/ が自動更新されます。

### デプロイ確認

1. **Actions タブ**: ワークフロー実行状況
2. **緑チェック✅**: デプロイ成功
3. **赤バツ❌**: エラー（ログで原因確認）

---

## 🔧 GitHub Actionsワークフローの仕組み

### ワークフローファイル

`.github/workflows/deploy.yml`

### 処理フロー

\`\`\`yaml
# 1. トリガー条件
on:
  push:
    branches: [ main ]     # mainブランチへのpushで起動
  workflow_dispatch:       # 手動実行も可能
\`\`\`

### ジョブ1: ビルド

\`\`\`yaml
jobs:
  build:
    runs-on: ubuntu-latest  # Ubuntu最新版で実行
    steps:
      # ステップ1: コードをチェックアウト
      - name: Checkout
        uses: actions/checkout@v4
        # → GitHubからコードを取得

      # ステップ2: Node.js環境セットアップ
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
        # → Node.js 20をインストール

      # ステップ3: pnpmインストール
      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8
        # → pnpm 8をインストール

      # ステップ4: 依存関係インストール
      - name: Install dependencies
        run: pnpm install
        # → package.jsonの依存関係をインストール

      # ステップ5: ビルド実行
      - name: Build with Astro
        run: pnpm build
        # → astro build && pagefind --source dist
        # 1. Astroが静的HTMLを生成（dist/）
        # 2. Pagefindが検索インデックス生成（dist/pagefind/）
        # 3. sitemapが自動生成（dist/sitemap-index.xml）

      # ステップ6: ビルド成果物をアップロード
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
        # → dist/フォルダをGitHub Pagesにアップロード
\`\`\`

### ジョブ2: デプロイ

\`\`\`yaml
  deploy:
    needs: build            # buildジョブ完了後に実行
    runs-on: ubuntu-latest
    environment:
      name: github-pages    # GitHub Pages環境
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      # GitHub Pagesにデプロイ
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
        # → アップロードされたartifactをGitHub Pagesに公開
        # → https://clown6613.github.io/blog/ が更新される
\`\`\`

### 権限設定

\`\`\`yaml
permissions:
  contents: read    # リポジトリ読み取り
  pages: write      # GitHub Pages書き込み
  id-token: write   # デプロイ認証
\`\`\`

### 実行時間

- **ビルド**: 約1-2分
- **デプロイ**: 約30秒-1分
- **反映**: 約1-2分（CDNキャッシュ更新）
- **合計**: 約2-5分

### トラブルシューティング

**ビルドエラーの場合**:
1. Actions タブでエラーログ確認
2. ローカルで `pnpm build` 実行して再現
3. エラー修正後、再度push

**デプロイエラーの場合**:
- Settings → Pages で Source が「GitHub Actions」になっているか確認
- リポジトリが Public になっているか確認

---

## 📁 プロジェクト構造

\`\`\`
blog/
├── src/
│   ├── content/
│   │   ├── config.ts              # Content Collections Zodスキーマ
│   │   └── posts/
│   │       ├── tech/              # 技術記事
│   │       │   ├── 2025-01-15-welcome.md
│   │       │   └── 2025-01-20-typescript-tips.md
│   │       └── hobby/             # Life記事
│   │           └── 2025-02-01-my-hobby.md
│   ├── pages/
│   │   ├── index.astro            # トップページ（記事一覧）
│   │   ├── posts/[...slug].astro  # 記事詳細（動的ルート）
│   │   ├── category/[category].astro  # カテゴリページ
│   │   ├── tags/[tag].astro       # タグページ
│   │   ├── rss.xml.ts             # RSSフィード
│   │   └── 404.astro              # 404ページ
│   ├── components/
│   │   ├── Header.astro           # ヘッダー（ナビ＋ダークモード）
│   │   ├── Footer.astro           # フッター
│   │   ├── PostCard.astro         # 記事カード
│   │   ├── Search.astro           # Pagefind検索UI
│   │   ├── ThemeToggle.astro      # ダークモード切り替え
│   │   ├── TableOfContents.astro  # 目次
│   │   ├── RelatedPosts.astro     # 関連記事
│   │   └── SortToggle.astro       # 並び替え
│   ├── layouts/
│   │   └── BaseLayout.astro       # 基本レイアウト＋OGPメタタグ
│   ├── utils/
│   │   └── readingTime.ts         # 読了時間計算
│   ├── constants/
│   │   └── categories.ts          # カテゴリ定義（Tech/Life）
│   └── types/
│       └── index.ts               # TypeScript型定義
├── public/
│   ├── images/                    # 記事画像
│   ├── .nojekyll                  # GitHub Pages用（重要！）
│   └── robots.txt                 # SEO（サイトマップ参照）
├── .github/workflows/
│   └── deploy.yml                 # GitHub Actions（自動デプロイ）
├── scripts/
│   └── new-post.sh                # 記事作成スクリプト
├── docs/
│   └── creating-posts.md          # 記事作成詳細ガイド
├── templates/
│   └── post-template.md           # 記事テンプレート
├── specs/                         # 機能仕様・設計ドキュメント
│   └── 001-personal-blog/
│       ├── spec.md                # 機能仕様書
│       ├── plan.md                # 実装計画
│       ├── tasks.md               # タスクリスト
│       ├── research.md            # 技術調査
│       ├── data-model.md          # データモデル
│       └── quickstart.md          # セットアップガイド
├── astro.config.mjs               # Astro設定
├── tailwind.config.mjs            # Tailwind設定
├── tsconfig.json                  # TypeScript設定
└── package.json
\`\`\`

---

## 🎨 カスタマイズ

### サイト名変更

\`\`\`astro
// src/components/Header.astro
📝 ぴえろぐ  // ← ここを変更

// src/layouts/BaseLayout.astro
<meta property="og:site_name" content="ぴえろぐ" />  // ← ここも
\`\`\`

### カラーテーマ変更

\`\`\`javascript
// tailwind.config.mjs
colors: {
  primary: {
    DEFAULT: '#047857',  // メインカラー（深緑）
    light: '#059669',    // 明るい深緑
    dark: '#065f46',     // 濃い深緑
  },
  secondary: {
    DEFAULT: '#0d9488',  // セカンダリ（ティール）
    light: '#14b8a6',
    dark: '#0f766e',
  }
}
\`\`\`

### カテゴリ追加

\`\`\`typescript
// src/constants/categories.ts
export type CategoryId = 'tech' | 'hobby' | 'newCategory';  // 型に追加

export const CATEGORIES = {
  tech: { ... },
  hobby: { ... },
  newCategory: {      // 新カテゴリ
    id: 'newCategory',
    name: 'カテゴリ名',
    description: '説明',
    icon: '🎯'
  }
};
\`\`\`

その後、`src/content/config.ts`のスキーマも更新:
\`\`\`typescript
category: z.enum(['tech', 'hobby', 'newCategory']),
\`\`\`

---

## 📝 記事作成ワークフロー

### 1. 記事作成

\`\`\`bash
./scripts/new-post.sh "新しい記事のタイトル" tech
\`\`\`

### 2. 編集

エディタで開いてMarkdownを書く

### 3. ローカル確認

\`\`\`bash
pnpm dev
# http://localhost:4321/blog で確認
\`\`\`

### 4. 下書き保存（オプション）

\`\`\`yaml
published: false  # まだ公開しない
\`\`\`

\`\`\`bash
git add .
git commit -m "Draft: 記事執筆中"
git push
\`\`\`

### 5. 公開

\`\`\`yaml
published: true   # 公開する
\`\`\`

\`\`\`bash
git add .
git commit -m "Publish: 新しい記事公開"
git push origin main
\`\`\`

### 6. 確認

2-5分後に https://clown6613.github.io/blog/ を確認

---

## 🌟 GitHub Pages無料枠

- **帯域幅**: 100GB/月（月100万PV相当）
- **ビルド時間**: 無制限（GitHub Actions使用時）
- **ストレージ**: 1GB
- **カスタムドメイン**: 対応（HTTPS自動）
- **コスト**: **完全無料**

---

## 🔍 SEO設定

### Google Search Console登録

1. https://search.google.com/search-console にアクセス
2. ドメイン追加: `https://clown6613.github.io/blog/`
3. サイトマップ送信: `https://clown6613.github.io/blog/sitemap-index.xml`

### RSSフィード

RSSリーダーで購読:
- **URL**: https://clown6613.github.io/blog/rss.xml

---

## 📊 パフォーマンス目標

- **ページ読み込み**: < 1.5秒（3G接続）
- **TTFB**: < 300ms
- **Lighthouse スコア**: 95-100点
- **Core Web Vitals**: すべてGreen

---

## 🤝 コントリビューション

Issue、Pull Request歓迎です！

---

## 📄 ライセンス

MIT License

---

## 👤 Author

**ぴえ** ([@clown6613](https://github.com/clown6613))

---

**Built with ❤️ using [Astro](https://astro.build) & [Tailwind CSS](https://tailwindcss.com)**
