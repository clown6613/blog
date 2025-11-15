# データモデル: 個人ブログサイト

**作成日**: 2025-11-16
**機能**: 個人ブログサイト

## 概要

このブログサイトは静的サイトジェネレーター（Astro）を使用するため、従来のデータベースは使用しません。すべてのデータはファイルシステム上のMarkdownファイルとYAMLフロントマターで管理されます。

## エンティティ

### 1. ブログ記事（BlogPost）

Markdownファイルとして `src/content/posts/` ディレクトリに保存されます。

#### ファイル構造

```
src/content/posts/
├── 2025-01-15-first-post.md
├── 2025-01-20-typescript-tips.md
└── 2025-02-01-my-hobby.md
```

#### フロントマター（YAMLメタデータ）

```yaml
---
title: string           # 記事タイトル（必須）
slug: string            # URL用スラッグ（必須、一意）
pubDate: Date           # 公開日（必須、ISO 8601形式: YYYY-MM-DD）
published: boolean      # 公開状態（必須、true/false）
category: string        # カテゴリ（必須、"tech" | "hobby"）
description: string     # 記事の説明（任意、SEO用）
tags: string[]          # タグリスト（任意）
image: string           # アイキャッチ画像パス（任意）
---

# 記事本文（Markdown形式）
```

#### TypeScript型定義

```typescript
interface BlogPost {
  // フロントマター
  title: string;
  slug: string;
  pubDate: Date;
  published: boolean;
  category: 'tech' | 'hobby';
  description?: string;
  tags?: string[];
  image?: string;

  // Astroが自動生成
  body: string;              // Markdown本文
  render(): Promise<{        // レンダリング関数
    Content: AstroComponent;
    headings: Heading[];
  }>;
}
```

#### 検証ルール

- **title**: 1文字以上200文字以下
- **slug**: 半角英数字とハイフンのみ、1文字以上100文字以下、一意
- **pubDate**: 有効な日付形式（ISO 8601: YYYY-MM-DD）
- **published**: booleanのみ（true/false）
- **category**: "tech" または "hobby"のみ
- **description**: 0文字以上300文字以下
- **tags**: 各タグは1文字以上50文字以下、最大10個
- **image**: 有効なファイルパス（/images/配下）

#### 状態遷移

```
[下書き作成] → (published: false) → [下書き]
                                        ↓
                                    [編集・レビュー]
                                        ↓
                                (published: true) → [公開]
                                        ↓
                                    [再編集]
                                        ↓
                                (published: false) → [非公開]
```

#### ファイル命名規則

推奨: `YYYY-MM-DD-slug.md`
- 例: `2025-01-15-hello-world.md`
- `slug`フィールドと一致させることでファイル管理が容易になる

---

### 2. カテゴリ（Category）

カテゴリは事前定義された固定値です。データベースやファイルでの管理は不要で、コード内の定数として定義されます。

#### TypeScript型定義

```typescript
type CategoryId = 'tech' | 'hobby';

interface Category {
  id: CategoryId;
  name: string;         // 表示名（日本語）
  description: string;  // カテゴリ説明
  icon?: string;        // アイコン（オプション）
}
```

#### 定義済みカテゴリ

```typescript
const CATEGORIES: Record<CategoryId, Category> = {
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

#### 検証ルール

- カテゴリIDは "tech" または "hobby" のみ
- 記事の`category`フィールドは必ず定義済みカテゴリIDのいずれかを参照

---

### 3. タグ（Tag）

タグは自由形式で記事のフロントマターに定義されます。タグの一覧は記事から動的に生成されます。

#### データソース

記事のフロントマター内の `tags` 配列:

```yaml
tags: ["TypeScript", "React", "Web開発"]
```

#### 自動生成される一覧

```typescript
// すべての記事からタグを抽出して一意のリストを生成
const allTags: string[] = [...new Set(
  posts.flatMap(post => post.data.tags || [])
)].sort();
```

#### 検証ルール

- 各タグは1文字以上50文字以下
- 1記事あたり最大10個のタグ
- 大文字小文字を区別

---

## エンティティ関係図

```
┌─────────────────────┐
│   BlogPost          │
│  (Markdownファイル)  │
├─────────────────────┤
│ - title             │
│ - slug (PK)         │
│ - pubDate           │
│ - published         │
│ - category (FK) ────┼──→ ┌──────────────┐
│ - description       │     │  Category    │
│ - tags[]            │     │  (定数定義)   │
│ - image             │     ├──────────────┤
│ - body              │     │ - id (PK)    │
└─────────────────────┘     │ - name       │
         │                  │ - description│
         │                  │ - icon       │
         │                  └──────────────┘
         │
         │ tags[] (配列)
         ↓
    ┌─────────┐
    │   Tag   │
    │(動的生成)│
    ├─────────┤
    │ - name  │
    └─────────┘
```

## ファイルシステムレイアウト

```
blog/
├── src/
│   ├── content/
│   │   ├── posts/                    # ブログ記事
│   │   │   ├── 2025-01-15-first-post.md
│   │   │   ├── 2025-01-20-typescript-tips.md
│   │   │   └── 2025-02-01-my-hobby.md
│   │   └── config.ts                 # Astro Content Collections設定
│   ├── constants/
│   │   └── categories.ts             # カテゴリ定義
│   └── pages/
│       ├── index.astro               # 記事一覧ページ
│       ├── posts/
│       │   └── [slug].astro          # 記事詳細ページ（動的ルート）
│       ├── category/
│       │   └── [category].astro      # カテゴリ別一覧ページ
│       └── tags/
│           └── [tag].astro           # タグ別一覧ページ
└── public/
    └── images/                        # 記事画像
        ├── post-image-1.jpg
        └── post-image-2.png
```

## データ取得パターン

### 1. すべての公開記事を取得

```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => {
  return data.published === true;
});

// 公開日でソート（新しい順）
posts.sort((a, b) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
```

### 2. カテゴリ別記事を取得

```typescript
const techPosts = await getCollection('posts', ({ data }) => {
  return data.published === true && data.category === 'tech';
});
```

### 3. タグ別記事を取得

```typescript
const taggedPosts = await getCollection('posts', ({ data }) => {
  return data.published === true &&
         data.tags?.includes('TypeScript');
});
```

### 4. 記事詳細を取得（slug指定）

```typescript
import { getEntry } from 'astro:content';

const post = await getEntry('posts', slug);
if (!post) {
  return Astro.redirect('/404');
}
```

## 検索インデックス

Pagefindが自動的にビルド時に生成するため、手動でのインデックス管理は不要です。

### インデックス対象

- 記事タイトル（`title`）
- 記事本文（Markdown body）
- カテゴリ名（`category`）
- タグ（`tags`）

### メタデータフィルター

Pagefindは以下のメタデータでフィルタリング可能:

```html
<article data-pagefind-body>
  <h1 data-pagefind-meta="title">記事タイトル</h1>
  <p data-pagefind-meta="category">tech</p>
  <p data-pagefind-meta="tags">TypeScript,React</p>
  <!-- 記事本文 -->
</article>
```

## パフォーマンス考慮事項

### ビルド時最適化

- すべての記事はビルド時に静的HTMLに変換
- 画像は自動的に最適化（Astro Image）
- 検索インデックスはインクリメンタルダウンロード対応

### ページネーション

記事数が50件を超えた場合、ページネーションを実装:

```typescript
import { paginate } from 'astro:content';

const paginatedPosts = paginate(posts, {
  pageSize: 10
});
```

## セキュリティ

### XSS対策

- すべてのユーザー入力（記事本文）はAstroが自動的にエスケープ
- Markdownは `remark-gfm` でサニタイズ

### コンテンツ検証

- フロントマターはAstro Content Collections schemaで型検証
- 不正な値はビルド時にエラー

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
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

## マイグレーション戦略（将来の拡張）

### データベース移行が必要になるケース

- コメント機能追加
- いいね・リアクション機能
- 記事の閲覧数トラッキング
- ユーザー登録・認証

### 移行時の考慮事項

- Markdownファイルはそのまま保持
- データベースはメタデータとユーザー生成コンテンツのみ
- 記事本文はファイルシステムで管理継続（Git履歴保持のため）
