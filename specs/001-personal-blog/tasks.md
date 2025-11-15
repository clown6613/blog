---
description: "個人ブログサイトの実装タスクリスト"
---

# タスク: 個人ブログサイト

**入力**: `/specs/001-personal-blog/` からの設計ドキュメント
**前提条件**: plan.md（必須）、spec.md（ユーザーストーリー用に必須）、research.md、data-model.md

**テスト**: 仕様にテスト要件の記載なし - テストタスクは含まれていません

**構成**: タスクはユーザーストーリー別にグループ化され、各ストーリーの独立した実装とテストを可能にします

## フォーマット: `[ID] [P?] [Story] 説明`

- **[P]**: 並列実行可能（異なるファイル、依存関係なし）
- **[Story]**: このタスクが属するユーザーストーリー（例: US1、US2、US3）
- ファイルパスを説明に含める

## パス規則

このプロジェクトはSingle Projectパターンを使用:
- ソースコード: `src/`（リポジトリルート）
- 記事: `src/content/posts/`
- ページ: `src/pages/`
- コンポーネント: `src/components/`
- レイアウト: `src/layouts/`
- 定数: `src/constants/`
- 画像: `public/images/`
- 設定: `astro.config.mjs`、`tailwind.config.mjs`、`tsconfig.json`

---

## Phase 1: セットアップ（共有インフラ）

**目的**: プロジェクト初期化と基本構造

- [ ] T001 Astroプロジェクトを初期化（最小テンプレート、TypeScript strictest）
- [ ] T002 [P] Tailwind CSS統合を追加（`pnpm astro add tailwind`）
- [ ] T003 [P] 必要な依存関係をインストール（@astrojs/markdown-remark、remark-gfm、date-fns）
- [ ] T004 [P] Pagefind検索ライブラリをdevDependenciesに追加（`pnpm add -D pagefind`）
- [ ] T005 プロジェクトディレクトリ構造を作成（src/content/posts、src/components、src/layouts、src/constants、public/images）
- [ ] T006 [P] .nojekyllファイルをpublic/.nojekyllに作成（GitHub Pages用）
- [ ] T007 [P] .gitignoreファイルを更新（node_modules、dist、.astro追加）

---

## Phase 2: 基盤（ブロックする前提条件）

**目的**: すべてのユーザーストーリーが依存するコアインフラ

**⚠️ 重要**: このフェーズが完了するまで、ユーザーストーリーの作業を開始できません

- [ ] T008 Astro設定ファイルを更新（Tailwind統合、Shiki設定、GitHub Pages用site/base設定）in astro.config.mjs
- [ ] T009 TypeScript設定ファイルを確認・調整 in tsconfig.json
- [ ] T010 Tailwind CSS設定ファイルを作成（カスタムカラー、フォント設定）in tailwind.config.mjs
- [ ] T011 [P] Content Collectionsスキーマを定義（BlogPostのZodスキーマ）in src/content/config.ts
- [ ] T012 [P] カテゴリ定数を定義（tech/hobbyのCategoryオブジェクト）in src/constants/categories.ts
- [ ] T013 [P] TypeScript型定義ファイルを作成（BlogPost、Category型）in src/types/index.ts
- [ ] T014 基本レイアウトコンポーネントを作成（HTML構造、メタタグ、Tailwind基本スタイル）in src/layouts/BaseLayout.astro
- [ ] T015 [P] ヘッダーコンポーネントを作成（サイトタイトル、ナビゲーション）in src/components/Header.astro
- [ ] T016 [P] フッターコンポーネントを作成（コピーライト、リンク）in src/components/Footer.astro
- [ ] T017 package.jsonのscriptsを更新（build時にPagefindインデックス生成: `astro build && pagefind --source dist`）
- [ ] T018 GitHub Actionsワークフローファイルを作成（Astro公式Action使用）in .github/workflows/deploy.yml

**チェックポイント**: 基盤準備完了 - ユーザーストーリー実装を並列で開始可能

---

## Phase 3: ユーザーストーリー 1 - ブログ記事の閲覧（優先度: P1）🎯 MVP

**目標**: 読者が公開記事を閲覧し、技術・趣味に関する記事を読めるようにする

**独立テスト**: ブラウザでサイトにアクセスし、記事一覧から任意の記事を選択して全文を読めることを確認。スマートフォンでも閲覧可能であることを確認。

### 実装（ユーザーストーリー 1）

- [ ] T019 [P] [US1] サンプル記事ファイルを3件作成（tech 2件、hobby 1件、published: true）in src/content/posts/
- [ ] T020 [P] [US1] 記事カードコンポーネントを作成（タイトル、日付、カテゴリ、抜粋表示、レスポンシブ）in src/components/PostCard.astro
- [ ] T021 [US1] トップページ（記事一覧）を実装（公開記事取得、日付ソート、PostCard使用）in src/pages/index.astro
- [ ] T022 [US1] 記事詳細ページを実装（動的ルート、Markdown レンダリング、Shikiハイライト）in src/pages/posts/[slug].astro
- [ ] T023 [US1] モバイルレスポンシブスタイリングを追加（Tailwind breakpoints: sm/md/lg/xl）
- [ ] T024 [US1] 記事が0件の場合のフォールバック表示を追加 in src/pages/index.astro
- [ ] T025 [US1] 記事詳細で存在しないslugの404処理を追加 in src/pages/posts/[slug].astro
- [ ] T026 [US1] ローカル開発サーバーで動作確認（`pnpm dev`、記事一覧・詳細ページ閲覧）
- [ ] T027 [US1] ビルドを実行して静的ファイル生成を確認（`pnpm build`）
- [ ] T028 [US1] GitHub Pagesにデプロイ（mainブランチにpush、Actions確認）

**チェックポイント**: この時点で、ユーザーストーリー1が完全に機能し、独立してテスト可能

---

## Phase 4: ユーザーストーリー 2 - 記事のカテゴリ分類と検索（優先度: P2）

**目標**: 読者が技術記事と趣味記事を区別して閲覧でき、キーワード検索で記事を見つけられるようにする

**独立テスト**: カテゴリフィルターで「技術」または「趣味」を選択し、該当記事のみ表示されることを確認。検索ボックスでキーワード入力し、関連記事が表示されることを確認。

### 実装（ユーザーストーリー 2）

- [ ] T029 [P] [US2] カテゴリ別記事一覧ページを作成（動的ルート、カテゴリフィルタリング）in src/pages/category/[category].astro
- [ ] T030 [P] [US2] タグ別記事一覧ページを作成（動的ルート、タグフィルタリング）in src/pages/tags/[tag].astro
- [ ] T031 [US2] トップページにカテゴリフィルターUIを追加（tech/hobbyボタン）in src/pages/index.astro
- [ ] T032 [US2] 記事詳細ページにカテゴリタグリンクを追加（クリックでカテゴリページ遷移）in src/pages/posts/[slug].astro
- [ ] T033 [P] [US2] 検索UIコンポーネントを作成（Pagefind UI統合、日本語化設定）in src/components/Search.astro
- [ ] T034 [US2] トップページに検索UIを追加（ヘッダーまたはサイドバー）in src/pages/index.astro
- [ ] T035 [US2] ビルドスクリプトでPagefindインデックス生成を確認（package.json scriptsで`astro build && pagefind --source dist`）
- [ ] T036 [US2] カテゴリページで記事0件の場合のメッセージを追加 in src/pages/category/[category].astro
- [ ] T037 [US2] 検索結果0件の場合のメッセージがPagefind UIで表示されることを確認
- [ ] T038 [US2] カテゴリとタグのページネーションを追加（記事が20件以上の場合）
- [ ] T039 [US2] 動作確認（カテゴリフィルター、検索機能、タグページ）
- [ ] T040 [US2] GitHub Pagesにデプロイして検索機能が動作することを確認

**チェックポイント**: この時点で、ユーザーストーリー1と2の両方が独立して機能する

---

## Phase 5: ユーザーストーリー 3 - 記事の作成と管理（優先度: P3）

**目標**: 著者（自分）がMarkdownで記事を作成・編集し、公開/非公開を管理できるようにする

**独立テスト**: プロジェクトのディレクトリに新しいMarkdownファイルを追加し、フロントマターを設定してサイトビルド後、記事が正しく表示されることを確認。

### 実装（ユーザーストーリー 3）

- [ ] T041 [P] [US3] 記事作成テンプレートファイルを作成（フロントマター例、Markdown構文例）in templates/post-template.md
- [ ] T042 [P] [US3] 記事作成ガイドドキュメントを作成（フロントマターフィールド説明、命名規則、画像配置方法）in docs/creating-posts.md
- [ ] T043 [US3] 下書き記事のフィルタリングロジックを確認（`published: false`が一覧に表示されないこと）in src/pages/index.astro
- [ ] T044 [US3] 画像パス処理を実装（public/images/からの相対パス、base URL対応）
- [ ] T045 [US3] Markdown不正構文のエラーハンドリングを追加（ビルド時エラー表示）
- [ ] T046 [US3] 存在しない画像のフォールバック処理を追加（alt属性表示、またはプレースホルダー画像）
- [ ] T047 [US3] 記事作成ワークフローを検証（新規.mdファイル作成→フロントマター記入→ビルド→確認）
- [ ] T048 [US3] 公開/非公開ステータス切り替えを検証（`published`フィールド変更→再ビルド→表示/非表示確認）

**チェックポイント**: すべてのユーザーストーリーが独立して機能する

---

## Phase 6: 仕上げ & 横断的関心事

**目的**: 複数のユーザーストーリーに影響する改善

- [ ] T049 [P] READMEファイルを作成（プロジェクト概要、セットアップ手順、デプロイ方法）in README.md
- [ ] T050 [P] 404ページを作成（カスタム404デザイン、ホームへのリンク）in src/pages/404.astro
- [ ] T051 [P] robots.txtファイルを作成（サイトマップURL、クローラー許可設定）in public/robots.txt
- [ ] T052 画像最適化を実装（Astro Imageコンポーネント使用）in src/components/OptimizedImage.astro
- [ ] T053 [P] アクセシビリティチェック（セマンティックHTML、alt属性、ARIA属性、キーボードナビゲーション）
- [ ] T054 [P] パフォーマンス最適化（Lighthouse監査、Core Web Vitals確認）
- [ ] T055 [P] ダークモード対応を追加（Tailwind dark:クラス、ローカルストレージでテーマ保存）
- [ ] T056 長い記事タイトルの表示調整（text-truncateまたは複数行表示）in src/components/PostCard.astro
- [ ] T057 クロスブラウザ動作確認（Chrome、Firefox、Safari、Edge）
- [ ] T058 モバイルデバイス動作確認（iOS Safari、Android Chrome、画面幅320px-1920px）
- [ ] T059 GitHub Pagesで最終デプロイ確認（HTTPS、カスタムドメイン設定可能性確認）
- [ ] T060 quickstart.mdの内容を検証（セットアップ手順が正しく動作するか実行確認）

---

## 依存関係 & 実行順序

### フェーズ依存関係

- **セットアップ（Phase 1）**: 依存関係なし - 即座に開始可能
- **基盤（Phase 2）**: セットアップ完了に依存 - すべてのユーザーストーリーをブロック
- **ユーザーストーリー（Phase 3+）**: すべて基盤フェーズ完了に依存
  - ユーザーストーリーは並列進行可能（複数開発者がいる場合）
  - または優先度順に順次実行（P1 → P2 → P3）
- **仕上げ（最終フェーズ）**: 希望するすべてのユーザーストーリー完了に依存

### ユーザーストーリー依存関係

- **ユーザーストーリー 1（P1）**: 基盤（Phase 2）完了後に開始可能 - 他ストーリーへの依存なし
- **ユーザーストーリー 2（P2）**: 基盤（Phase 2）完了後に開始可能 - US1と統合するが独立してテスト可能
- **ユーザーストーリー 3（P3）**: 基盤（Phase 2）完了後に開始可能 - US1/US2と統合するが独立してテスト可能

### 各ユーザーストーリー内

- モデル（エンティティ定義）が最初
- サービスがモデルの後
- ページ/コンポーネントがサービスの後
- 統合が実装の後
- 次の優先度に移る前にストーリー完了

### 並列実行の機会

- セットアップフェーズで[P]マークのタスクすべて並列実行可能
- 基盤フェーズで[P]マークのタスクすべて並列実行可能（Phase 2内）
- 基盤フェーズ完了後、すべてのユーザーストーリーを並列開始可能（チーム規模が許せば）
- ストーリー内で[P]マークのタスクは並列実行可能
- 異なるユーザーストーリーは異なるチームメンバーが並列作業可能

---

## 並列実行例: ユーザーストーリー 1

```bash
# セットアップフェーズ（Phase 1）の並列タスク:
並列実行: T002, T003, T004, T006, T007

# 基盤フェーズ（Phase 2）の並列タスク:
並列実行: T011, T012, T013, T015, T016

# ユーザーストーリー1の並列タスク:
並列実行: T019, T020
```

---

## 実装戦略

### MVP優先（ユーザーストーリー 1のみ）

1. Phase 1: セットアップを完了
2. Phase 2: 基盤を完了（重要 - すべてのストーリーをブロック）
3. Phase 3: ユーザーストーリー 1を完了
4. **STOP and VALIDATE**: ユーザーストーリー 1を独立してテスト
5. 準備ができたらデプロイ/デモ

**MVP完了時の成果物**:
- 記事一覧ページ（トップページ）
- 記事詳細ページ（シンタックスハイライト付き）
- レスポンシブデザイン（SP/デスクトップ対応）
- 3件のサンプル記事
- GitHub Pagesで公開済み

### 段階的デリバリー

1. セットアップ + 基盤 → 基盤準備完了
2. + ユーザーストーリー 1 → 独立してテスト → デプロイ/デモ（**MVP!**）
3. + ユーザーストーリー 2 → 独立してテスト → デプロイ/デモ
4. + ユーザーストーリー 3 → 独立してテスト → デプロイ/デモ
5. 各ストーリーが前のストーリーを壊さずに価値を追加

### 並列チーム戦略

複数開発者がいる場合:

1. チーム全体でセットアップ + 基盤を完成
2. 基盤完了後:
   - 開発者A: ユーザーストーリー 1
   - 開発者B: ユーザーストーリー 2（並行開発可能）
   - 開発者C: ユーザーストーリー 3（並行開発可能）
3. ストーリーを独立して完成・統合

---

## タスク実行時の注意事項

### GitHub Pages固有の設定

**必須設定** (Phase 2で実施):
1. `astro.config.mjs`の`site`と`base`設定
2. `public/.nojekyll`ファイル作成
3. GitHub Actions YAML作成

**GitHubリポジトリ設定**（初回デプロイ前）:
1. Settings → Pages → Source: "GitHub Actions"を選択
2. リポジトリをPublicに設定（GitHub Pages無料利用のため）

### 画像パスの処理

- `base`設定がある場合: `/blog/images/...`
- `base`設定がない場合: `/images/...`
- Astroの`import.meta.env.BASE_URL`を使用して動的に対応

### デプロイ検証

各ユーザーストーリー完了後:
1. ローカルビルド: `pnpm build`
2. ローカルプレビュー: `pnpm preview`
3. mainブランチにpush
4. GitHub Actionsでビルド成功確認
5. GitHub Pages URLで動作確認

---

## メモ

- [P]タスク = 異なるファイル、依存関係なし
- [Story]ラベル = 特定のユーザーストーリーへのタスクマッピング（トレーサビリティ向上）
- 各ユーザーストーリーは独立して完成・テスト可能
- 各タスクまたは論理的グループ後にコミット
- 任意のチェックポイントで停止してストーリーを独立して検証可能
- 避けるべき: 曖昧なタスク、同一ファイルの競合、ストーリーの独立性を壊すクロスストーリー依存関係

---

## タスク概要

**総タスク数**: 60タスク

**ユーザーストーリー別タスク数**:
- セットアップ（Phase 1）: 7タスク
- 基盤（Phase 2）: 11タスク
- ユーザーストーリー 1（P1 - MVP）: 10タスク
- ユーザーストーリー 2（P2）: 12タスク
- ユーザーストーリー 3（P3）: 8タスク
- 仕上げ（Phase 6）: 12タスク

**並列実行機会**:
- Phase 1: 5タスク並列可能
- Phase 2: 5タスク並列可能
- Phase 3（US1）: 2タスク並列可能
- Phase 4（US2）: 3タスク並列可能
- Phase 5（US3）: 3タスク並列可能
- Phase 6: 6タスク並列可能

**推奨MVPスコープ**:
Phase 1 + Phase 2 + Phase 3（ユーザーストーリー 1のみ）= **28タスク**

これでブログの基本機能（記事閲覧）が完成し、GitHub Pagesで公開できます。

**各ストーリーの独立テスト基準**:
- **US1**: 記事一覧・詳細ページが閲覧可能、レスポンシブ、シンタックスハイライト動作
- **US2**: カテゴリフィルター動作、検索で記事発見可能、タグページ遷移
- **US3**: 新規Markdown作成→ビルド→公開、published切り替え動作、画像表示
