# 記事作成ガイド

## 新しい記事の作成方法

### 1. 記事ファイルを作成

カテゴリに応じたディレクトリに新しいMarkdownファイルを作成します。

**ディレクトリ構造**:
```
src/content/posts/
├── tech/     # 技術記事
└── hobby/    # 趣味記事
```

**ファイル名の規則**:
- **推奨**: `YYYY-MM-DD-スラッグ.md`
- **例**:
  - `tech/2025-01-15-typescript-tutorial.md`
  - `hobby/2025-02-01-my-weekend.md`
- 日付でファイルがソートされるので管理が楽
- 半角英数字とハイフンのみ使用

### 2. フロントマターを記入

記事の先頭に以下のYAML形式のメタデータを記入します:

\`\`\`yaml
---
title: "記事タイトル"
pubDate: 2025-01-15
published: true
category: "tech"
description: "記事の説明（SEO用）"
tags: ["タグ1", "タグ2"]
image: "/images/post-image.jpg"
---
\`\`\`

### フロントマターフィールド説明

#### 必須フィールド

- **title** (string): 記事のタイトル（1-200文字）
- **pubDate** (date): 公開日（ISO 8601形式: YYYY-MM-DD）
- **published** (boolean): 公開状態
  - `true`: 公開（サイトに表示される）
  - `false`: 下書き（サイトに表示されない）
- **category** (string): カテゴリ
  - `"tech"`: 技術記事
  - `"hobby"`: 趣味記事

#### オプションフィールド

- **description** (string): 記事の説明（最大300文字、SEO用）
- **tags** (array): タグのリスト（最大10個、各タグ最大50文字）
- **image** (string): アイキャッチ画像のパス（`/images/`配下）

### 3. 記事本文を書く

フロントマターの後にMarkdown形式で本文を書きます。

#### 使用可能なMarkdown構文

- **見出し**: `# H1`、`## H2`、`### H3`
- **太字**: `**太字**`
- **斜体**: `*斜体*`
- **リスト**: `-` または `1.`
- **リンク**: `[テキスト](URL)`
- **画像**: `![alt](/images/image.jpg)`
- **コードブロック**: ` ```言語名` で囲む
- **引用**: `> 引用文`

#### コードブロック例

\`\`\`typescript
const example = () => {
  console.log('Hello');
};
\`\`\`

対応言語: TypeScript、JavaScript、Python、Go、Rust、HTML、CSS、Bash など

### 4. 画像の追加

1. 画像を `public/images/` に配置
2. Markdownから参照:

\`\`\`markdown
![画像の説明](/images/my-image.jpg)
\`\`\`

**注意**: GitHub Pages設定で`base: '/blog'`の場合、実際のURLは`/blog/images/...`になりますが、Markdownでは`/images/...`と書けばOKです。

### 5. ビルドして確認

\`\`\`bash
# ビルド
pnpm build

# ローカルプレビュー
pnpm preview

# または開発サーバー
pnpm dev
\`\`\`

ブラウザで `http://localhost:4321/blog` にアクセスして確認。

### 6. 公開

\`\`\`bash
# Gitにコミット
git add .
git commit -m "Add: 新しい記事を追加"
git push origin main
\`\`\`

GitHub Actionsが自動的にビルド・デプロイします（2-5分）。

## 公開/非公開の切り替え

### 下書きとして保存

\`\`\`yaml
published: false
\`\`\`

### 公開する

\`\`\`yaml
published: true
\`\`\`

変更後、ビルド＆デプロイで反映されます。

## ベストプラクティス

### ファイル名

- **推奨**: `meaningful-slug-name.md`
- **避ける**: 日本語、スペース、特殊文字

### タイトル

- 簡潔で分かりやすく（50文字以内推奨）
- SEOを意識してキーワードを含める

### 公開日

- 実際に公開する日付を設定
- 未来の日付でも問題なし（ビルド時に公開される）

### カテゴリとタグ

- **カテゴリ**: 記事の大分類（tech/hobby）
- **タグ**: 詳細なトピック（3-5個推奨）

### 画像

- WebP形式推奨（軽量）
- ファイルサイズ: 500KB以内推奨
- 解像度: 1200px幅以内

## トラブルシューティング

### ビルドエラー: Invalid date

\`\`\`yaml
pubDate: 2025-01-15  # ✅ 正しい（YYYY-MM-DD）
pubDate: 01/15/2025  # ❌ 間違い
\`\`\`

### ビルドエラー: Invalid category

\`\`\`yaml
category: "tech"   # ✅ 正しい
category: "Tech"   # ❌ 大文字は不可
category: "blog"   # ❌ 未定義のカテゴリ
\`\`\`

### 記事が表示されない

- `published: true` になっているか確認
- ビルドを再実行
- ブラウザのキャッシュをクリア
