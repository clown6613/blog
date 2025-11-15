# 実装計画: 個人ブログサイト（GitHub Pages対応版）

**ブランチ**: `001-personal-blog` | **日付**: 2025-11-16 | **仕様**: [spec.md](./spec.md)
**入力**: `/specs/001-personal-blog/spec.md` からの機能仕様
**ホスティング**: GitHub Pages（完全無料）

## 概要

Markdownベースの個人ブログサイトを構築します。技術記事と趣味の記事を公開し、カテゴリ分類・検索機能を提供します。2025年のWebデファクトスタンダード技術（Astro + TypeScript + Tailwind CSS）を使用し、完全静的サイトとして**GitHub Pages**で完全無料運用します。

### 主要要件
- Markdownファイルでの記事管理（Gitバージョン管理）
- レスポンシブデザイン（SP/デスクトップ対応）
- カテゴリ分類（技術/趣味）と検索機能
- シンタックスハイライト付きコード表示
- 無料ホスティング対応（静的サイト生成）

### 技術的アプローチ
2024-2025年で最も急成長しているAstroをSSGとして採用し、TypeScript + Tailwind CSSでモダンな開発者体験を実現。Pagefindによる静的検索、Shikiによる高品質シンタックスハイライトを統合。GitHub Pages + GitHub Actionsで完全無料デプロイ。

## 技術コンテキスト

**言語/バージョン**: TypeScript 5.x + Node.js 20 LTS
**主要依存関係**: Astro 4.x, Tailwind CSS 4.x, Pagefind, Shiki（Astro内蔵）, remark（unified）, date-fns
**ストレージ**: ファイルシステム（Markdownファイル、データベース不要）
**テスト**: 仕様に明示的な要件なし（将来的にVitest + Playwright追加可能）
**ターゲットプラットフォーム**: Web（モダンブラウザ：Chrome, Firefox, Safari, Edge）、モバイル対応
**プロジェクトタイプ**: Single Project（静的サイト）
**ホスティング**: GitHub Pages（完全無料）
**パフォーマンス目標**:
- ページ読み込み < 1.5秒（3G）
- TTFB < 300ms（GitHub CDN）
- Lighthouse スコア 95-100点
- Core Web Vitals すべてGreen
**制約**:
- 月額コスト0円（完全無料）
- データベース不要
- サーバーサイド処理なし（完全静的）
- リポジトリサイズ < 1GB
- 月間帯域幅 < 100GB
**スケール/スコープ**: 初期50-100記事想定、将来的に500記事まで拡張可能

## 憲法チェック

*ゲート: Phase 0 調査前に合格必須。Phase 1 設計後に再チェック。*

### コンテンツファースト開発（原則I）
✅ **合格**: Markdownファイルでコンテンツを直接管理。技術アーキテクチャ（Astro）はコンテンツ配信に特化。データベースやCMSの複雑性を排除し、Git + エディタだけで記事作成可能。

### 段階的デリバリー（原則II）
✅ **合格**: 3つの独立したユーザーストーリー（P1: 記事閲覧、P2: カテゴリ・検索、P3: 記事管理）を定義。各ストーリーは独立してテスト・デプロイ可能。

### テスト規律（原則III）
✅ **適用外**: 仕様にテスト要件の記載なし。将来的に必要に応じてVitest（ユニット）+ Playwright（E2E）を追加可能。

### デフォルトでシンプル（原則IV）
✅ **合格**:
- データベース不要（ファイルベース）
- サーバー不要（完全静的）
- 認証システム不要
- CMSなし（Markdown直接編集）
- 最小限の依存関係（Astro + Tailwind + Pagefind）

### コードとしてのドキュメント（原則V）
✅ **合格**: すべてのドキュメント（仕様、計画、データモデル、クイックスタート）をMarkdownでリポジトリ内に配置。コードと同じGitワークフロー。

### 品質基準
✅ **パフォーマンス**: 静的サイト生成により目標を大幅に上回る（TTFB < 200ms、読み込み < 1秒）
✅ **アクセシビリティ**: セマンティックHTML、キーボードナビゲーション、Astro標準準拠でWCAG 2.1 AA達成可能
✅ **セキュリティ**: 静的サイトのためXSS攻撃面が最小。ユーザー入力なし。依存関係は定期的にスキャン。

## プロジェクト構造

### ドキュメント（本機能）

```text
specs/001-personal-blog/
├── plan.md              # 本ファイル（/speckit.plan コマンド出力）
├── spec.md              # 機能仕様書
├── research.md          # Phase 0 出力（/speckit.plan コマンド）
├── data-model.md        # Phase 1 出力（/speckit.plan コマンド）
├── quickstart.md        # Phase 1 出力（/speckit.plan コマンド）
├── checklists/
│   └── requirements.md  # 仕様品質チェックリスト
└── tasks.md             # Phase 2 出力（/speckit.tasks コマンド - NOT created by /speckit.plan）
```

### ソースコード（リポジトリルート）

```text
blog/
├── src/
│   ├── content/
│   │   ├── config.ts              # Content Collections スキーマ定義
│   │   └── posts/                 # ブログ記事（Markdown）
│   │       ├── 2025-01-15-welcome.md
│   │       └── 2025-01-20-typescript-tips.md
│   ├── pages/
│   │   ├── index.astro            # トップページ（記事一覧）
│   │   ├── posts/
│   │   │   └── [slug].astro       # 記事詳細ページ（動的ルート）
│   │   ├── category/
│   │   │   └── [category].astro   # カテゴリ別一覧ページ
│   │   └── tags/
│   │       └── [tag].astro         # タグ別一覧ページ
│   ├── layouts/
│   │   └── BaseLayout.astro       # 基本レイアウト
│   ├── components/
│   │   ├── Header.astro           # ヘッダーコンポーネント
│   │   ├── Footer.astro           # フッターコンポーネント
│   │   ├── PostCard.astro         # 記事カードコンポーネント
│   │   └── Search.astro           # 検索UIコンポーネント
│   └── constants/
│       └── categories.ts          # カテゴリ定義
├── public/
│   └── images/                    # 記事画像
├── astro.config.mjs               # Astro設定
├── tailwind.config.mjs            # Tailwind CSS設定
├── tsconfig.json                  # TypeScript設定
└── package.json                   # 依存関係
```

**構造決定**: Single Projectパターンを採用。静的サイトのため、バックエンド/フロントエンド分離は不要。Astroのファイルベースルーティングにより、シンプルな構造でSEO対応のURLを実現。

## 複雑性追跡

> **憲法チェックの違反がある場合のみ記入**

*該当なし - すべての憲法原則に準拠*

## Phase 0: 調査と研究（完了）

### 実施内容

✅ 2024-2025年のWebデファクトスタンダード技術を調査
✅ 静的サイトジェネレーター（SSG）の比較（Astro、Next.js、Hugo、Eleventyなど）
✅ TypeScript採用率、Tailwind CSS採用率の確認
✅ シンタックスハイライトライブラリ比較（Shiki、Prism、Highlight.js）
✅ 静的サイト検索ソリューション比較（Pagefind、FlexSearch、Lunr.js）
✅ 無料ホスティングサービス比較（Vercel、Netlify、Cloudflare Pages）

### 決定事項

- **SSG**: Astro（2024-2025年で最も急成長、ブログに最適化）
- **言語**: TypeScript（2025年のデファクトスタンダード、80%採用見込み）
- **CSS**: Tailwind CSS（2024年にBootstrap超え、50%使用率）
- **Markdownパーサー**: remark (Astro内蔵)
- **シンタックスハイライト**: Shiki（VS Code品質、Astro公式サポート）
- **検索**: Pagefind（2024年リリース、静的サイト向けRust製）
- **ホスティング**: **GitHub Pages + GitHub Actions**（完全無料、Astro公式Action対応）

### 出力ファイル

✅ `research.md` - 技術調査レポート、代替案の検討、選定理由

## Phase 1: 設計と契約（完了）

### 実施内容

✅ **data-model.md生成**: Markdownベースのブログ記事エンティティ、カテゴリ定義、TypeScript型定義、検証ルール
✅ **quickstart.md生成**: 開発環境セットアップ手順、記事作成ワークフロー、デプロイ手順（Vercel）
✅ **contracts/**: 静的サイトのためAPIエンドポイントなし（スキップ）

### データモデル概要

**エンティティ**:
1. **BlogPost**: Markdownファイル + YAMLフロントマター
   - フィールド: title, slug, pubDate, published, category, description, tags, image, body
   - 保存場所: `src/content/posts/*.md`
   - 検証: Astro Content Collections schema（Zodスキーマ）

2. **Category**: 定数定義（tech/hobby）
   - 保存場所: `src/constants/categories.ts`
   - 拡張性: 新カテゴリ追加は定数に追加するだけ

3. **Tag**: 動的生成（記事からタグを抽出）

**データフロー**:
```
Markdown (.md)
  → Astro Content Collections
  → TypeScript型チェック
  → 静的HTML生成
  → Pagefindインデックス化
  → Vercelデプロイ
```

### 出力ファイル

✅ `data-model.md` - エンティティ定義、型定義、検証ルール、ファイルシステムレイアウト
✅ `quickstart.md` - セットアップ手順、記事作成ワークフロー、デプロイ手順

### 憲法チェック再評価（Phase 1後）

✅ **すべての原則に引き続き準拠**
- データモデルはMarkdownファイルベースでシンプル
- 段階的実装が可能な設計
- ドキュメントがリポジトリ内で完結

## Phase 2: タスク生成（次のステップ）

**重要**: Phase 2はこのコマンド（`/speckit.plan`）では実行しません。

Phase 1完了後、以下のコマンドを実行してタスクリストを生成してください:

```bash
/speckit.tasks
```

このコマンドは以下を生成します:
- `specs/001-personal-blog/tasks.md` - 依存関係順のタスクリスト
- ユーザーストーリー別のタスク分類
- 並列実行可能なタスクの識別
- MVP（User Story 1のみ）と段階的デリバリー戦略

### 期待されるタスクフェーズ

1. **Phase 1: セットアップ** - Astroプロジェクト初期化、依存関係インストール
2. **Phase 2: 基盤** - 基本レイアウト、コンポーネント、型定義
3. **Phase 3: ユーザーストーリー1（P1）** - 記事閲覧機能（MVP）
4. **Phase 4: ユーザーストーリー2（P2）** - カテゴリ・検索機能
5. **Phase 5: ユーザーストーリー3（P3）** - 記事管理ワークフロー
6. **Phase 6: 仕上げ** - ドキュメント、最適化、デプロイ

## 実装戦略

### MVP優先（User Story 1のみ）

1. Phase 1-2: セットアップ + 基盤
2. Phase 3: ユーザーストーリー1（記事閲覧）
3. **STOP and VALIDATE**: 記事一覧・詳細ページが動作することを確認
4. Vercelにデプロイして実際のURLで確認
5. 問題なければPhase 4へ進む

### 段階的デリバリー

1. セットアップ + 基盤 → 開発環境準備完了
2. + ユーザーストーリー1 → MVP完成（記事閲覧）→ デプロイ可能
3. + ユーザーストーリー2 → カテゴリ・検索機能追加 → デプロイ
4. + ユーザーストーリー3 → 記事管理ワークフロー確立 → デプロイ
5. 各ストーリーが独立して価値を提供し、前のストーリーを壊さない

### 並列チーム戦略

複数開発者がいる場合:
1. チーム全体でセットアップ + 基盤を完成
2. 基盤完成後:
   - 開発者A: ユーザーストーリー1
   - 開発者B: ユーザーストーリー2（並行開発可能）
   - 開発者C: ユーザーストーリー3（並行開発可能）
3. 各ストーリーを独立して完成・統合

## 次のアクション

1. ✅ **Phase 0完了**: research.md生成済み
2. ✅ **Phase 1完了**: data-model.md、quickstart.md生成済み
3. ⏭️ **Phase 2**: `/speckit.tasks` コマンドを実行してタスクリスト生成
4. ⏭️ **実装開始**: tasks.mdに従ってコーディング開始

## 参考ドキュメント

- **機能仕様**: [spec.md](./spec.md)
- **技術調査**: [research.md](./research.md)
- **データモデル**: [data-model.md](./data-model.md)
- **クイックスタート**: [quickstart.md](./quickstart.md)
- **要件チェックリスト**: [checklists/requirements.md](./checklists/requirements.md)

## GitHub Pages固有の設定

### 追加の設定ファイル

1. **.nojekyll**: `public/.nojekyll`に空ファイル配置
   - 理由: Astroの`_astro`ディレクトリがJekyllに無視されるのを防ぐ

2. **GitHub Actions**: `.github/workflows/deploy.yml`
   - Astro公式Action使用
   - mainブランチへのpushで自動デプロイ

3. **Astro Config**: `astro.config.mjs`
   ```javascript
   site: 'https://username.github.io',
   base: '/repo-name', // プロジェクトページの場合
   ```

### GitHub Pagesのメリット

- ✅ **完全無料**: 帯域幅100GB/月、ビルド時間無制限
- ✅ **Git連携**: mainへのpushで自動デプロイ
- ✅ **カスタムドメイン対応**: 無料HTTPS証明書自動発行
- ✅ **シンプル**: 外部サービス不要、GitHub完結

### GitHub Pagesの制約

- ⚠️ **ベースURL設定**: `astro.config.mjs`で`site`と`base`設定必須
- ⚠️ **プレビューデプロイなし**: プルリクエストでの自動プレビュー機能なし
- ⚠️ **ビルド時間**: GitHub Actions経由で若干遅延（2-5分）

**結論**: 制約は軽微で、完全無料のメリットが大きく上回る

## 補足情報

### パフォーマンス期待値

- **ページ読み込み**: < 1.5秒（3G） - 憲法要件2秒を上回る
- **TTFB**: < 300ms（GitHub CDN） - 憲法要件500msを上回る
- **Lighthouse スコア**: 95-100点（すべてのカテゴリ）
- **Core Web Vitals**: すべてGreen
- **ビルド時間**: < 2分（記事100件以下、GitHub Actions）

*注: GitHub CDNはVercelのエッジCDNと比較してTTFBがやや劣る可能性がありますが、静的サイトのため実用上問題ありません。*

### 将来の拡張性

Phase 3完了後、必要に応じて以下を追加可能:
- **コメント機能**: Giscus（GitHub Discussions連携）またはDisqus
- **RSS Feed**: Astro公式プラグイン `@astrojs/rss`
- **サイトマップ**: Astro公式プラグイン `@astrojs/sitemap`
- **ダークモード**: Tailwind CSS Dark Mode + ローカルストレージ
- **多言語対応**: Astro i18n機能
- **分析**: Google Analytics 4またはPlausible Analytics
- **MDX対応**: `@astrojs/mdx` でインタラクティブコンポーネント埋め込み
