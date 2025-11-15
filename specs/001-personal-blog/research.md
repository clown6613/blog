# 技術調査レポート: 個人ブログサイト（GitHub Pages対応版）

**作成日**: 2025-11-16
**更新日**: 2025-11-16
**機能**: 個人ブログサイト（技術・趣味記事）
**ホスティング**: GitHub Pages（完全無料）

## 調査概要

Webのデファクトスタンダード技術で、**GitHub Pagesで完全無料**でホスティング可能な静的ブログサイトを構築するための技術スタックを調査しました。

## 重要な変更点（Vercel → GitHub Pages）

### ホスティング変更の理由
- **ユーザー要望**: 完全無料で利用したい
- **GitHub Pages**: 100%無料、商用利用も可能（個人ブログの範囲）
- **Vercel無料プラン**: 個人プロジェクトのみ、商用利用不可

### GitHub Pages特有の制約
- **自動ビルド対応**: Jekyllのみ（他SSGはGitHub Actions必須）
- **ベースURL設定**: プロジェクトページ形式の場合`/repo-name/`が必要
- **ビルドタイムアウト**: 10分
- **月間帯域幅**: 100GB（ソフト制限）
- **`.nojekyll`ファイル**: 多くのモダンSSGで必要

## 決定事項

### 1. 静的サイトジェネレーター（SSG）

**決定**: **Astro + GitHub Actions**

**理由**:
- 2024-2025年で最も急成長している静的サイトジェネレーター
- GitHub Pages公式Action提供（`withastro/action@v5`）
- Markdownベースのブログに最適化されたContent Collections API
- デフォルトでゼロJavaScript、必要な部分だけインタラクティブに（Island Architecture）
- TypeScript、Tailwind CSS、Reactなどのエコシステムとの統合が容易
- GitHub Actionsで自動ビルド・デプロイが簡単

**GitHub Pages対応設定**:
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name', // プロジェクトページの場合
  // ユーザーページ（username.github.io）の場合はbase不要
});
```

**必要な追加ファイル**:
- `.nojekyll` - `public/`ディレクトリに配置
- `.github/workflows/deploy.yml` - GitHub Actions設定

**代替案の検討**:

1. **Jekyll（最もシンプル）**:
   - ✅ Git pushだけで自動デプロイ（GitHub Actions不要）
   - ✅ ブログ特化設計
   - ❌ Ruby環境構築が必要
   - ❌ プラグイン制限あり（ホワイトリスト登録プラグインのみ）
   - ❌ ビルド速度遅い（大規模サイトで問題）
   - ❌ モダンなJavaScript/TypeScriptエコシステムとの統合が弱い
   - **結論**: シンプルさは魅力だが、TypeScriptやTailwind CSSとの統合が困難

2. **Hugo（最速）**:
   - ✅ 圧倒的なビルド速度（10,000ページで2.95秒、Jekyll比63倍高速）
   - ✅ Go製シングルバイナリ
   - ❌ Go言語ベース、JavaScript/TypeScriptエコシステムとの統合が弱い
   - ❌ テンプレート構文がやや独特
   - **結論**: 大規模サイト（1000ページ以上）でなければオーバースペック

3. **Next.js（Static Export）**:
   - ✅ Reactエコシステム
   - ❌ 設定が複雑（`basePath`、`images.unoptimized: true`、`.nojekyll`など）
   - ❌ ブログには過剰な機能
   - ❌ ビルドサイズが大きい
   - **結論**: ブログサイトには不向き

4. **Eleventy**:
   - ✅ シンプルで柔軟
   - ✅ 高速ビルド
   - ❌ Astroの方がMarkdownブログ向けの機能が充実
   - ❌ TypeScriptサポートがAstroより弱い
   - **結論**: 良い選択肢だが、Astroの方がブログに特化

**最終判断**:
**Astro + GitHub Actions**が、モダンな開発体験、TypeScript/Tailwind CSS統合、ブログ機能の充実、GitHub Pages対応の容易さの観点から最適。

### 2. プログラミング言語

**決定**: **TypeScript**

**理由**:
- 2025年時点でWebのデファクトスタンダード（採用率35-38%、2025年には80%見込み）
- 大規模プロジェクトでの型安全性とメンテナンス性
- Astroの公式推奨
- 将来的な拡張の際に保守性が向上

**変更なし** - GitHub Pages対応でも引き続きTypeScript推奨

### 3. CSSフレームワーク

**決定**: **Tailwind CSS**

**理由**:
- 2024年にBootstrapを抜いて最も人気のCSSフレームワーク（使用率50.5%）
- ユーティリティファーストアプローチで高速な開発
- レスポンシブデザイン対応が容易（SP/デスクトップ両対応の要件に最適）
- Astroとの統合が公式サポート済み
- 軽量で高パフォーマンス（未使用クラスはパージされる）

**変更なし** - GitHub Pages対応でも引き続きTailwind CSS推奨

### 4. Markdownパーサー

**決定**: **remark（unifiedエコシステム）**

**理由**:
- Astroが内部で使用している標準パーサー
- 週間1,300万ダウンロード、業界標準
- プラグインエコシステムが豊富（remark-gfm、remark-math、remark-tocなど）
- AST変換により柔軟なMarkdown処理が可能
- フロントマター、カスタムコンポーネント埋め込みに対応

**変更なし** - GitHub Pages対応でも引き続きremark推奨

### 5. シンタックスハイライト

**決定**: **Shiki**

**理由**:
- 2024-2025年のデファクトスタンダード（静的サイト向け）
- VS Codeと同じTextMate文法を使用、最高品質のハイライト
- Astroが公式サポート（設定1行で有効化可能）
- インラインスタイリングでテーマCSS不要
- 動的テーマ切り替え対応（ダーク/ライトモード）
- ビルド時に処理されるため、クライアント側のパフォーマンス影響なし

**変更なし** - GitHub Pages対応でも引き続きShiki推奨

### 6. 検索機能

**決定**: **Pagefind**

**理由**:
- 2024年リリースの最新静的サイト検索ライブラリ
- Rust + WebAssemblyで実装、高速かつ軽量
- 完全静的検索（サーバー不要、GitHub Pagesに最適）
- MDN全体を300KB未満で検索可能な圧倒的な効率性
- インクリメンタルダウンロード（必要な部分のみ読み込み）
- Astroとの統合が容易
- **GitHub Pagesで追加コストなしで動作**

**変更なし** - GitHub Pages対応でも引き続きPagefind推奨

### 7. ホスティングサービス

**決定**: **GitHub Pages + GitHub Actions**（変更）

**理由**:
- **完全無料** - 帯域幅100GB/月、ビルド時間無制限（GitHub Actions使用時）
- **カスタムドメイン対応** - 無料でHTTPS自動証明書発行（Let's Encrypt）
- **Astro公式サポート** - `withastro/action@v5`で簡単デプロイ
- **Git連携** - mainブランチへのpushで自動デプロイ
- **シンプルな設定** - GitHub Actions YAML 1ファイル

**Vercelから変更した理由**:
- **ユーザー要望**: 完全無料で利用したい
- **Vercel無料プラン制約**: 商用利用不可（個人プロジェクトのみ）
- **GitHub Pages**: 個人ブログの範囲で商用利用も可能、追加料金一切なし

**GitHub Pages vs Vercel比較**:

| 項目 | GitHub Pages | Vercel（無料） |
|------|-------------|--------------|
| 完全無料 | ✅ | ✅ |
| 商用利用 | ✅（個人ブログ範囲） | ❌ |
| 帯域幅 | 100GB/月 | 100GB/月 |
| ビルド時間 | 無制限（Actions） | 6,000分/月 |
| カスタムドメイン | ✅ | ✅ |
| プレビューデプロイ | ❌ | ✅ |
| 設定の簡単さ | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐⭐ |

**結論**: 完全無料要件を満たすため、GitHub Pagesが最適。

## 技術スタック決定版（2025年Webデファクトスタンダード + GitHub Pages対応）

```
SSG:               Astro
言語:              TypeScript
CSS:               Tailwind CSS
Markdownパーサー:   remark (unified)
シンタックスハイライト: Shiki
検索:              Pagefind
ホスティング:       GitHub Pages + GitHub Actions
```

## GitHub Pages固有の設定

### 1. ベースURL設定

**プロジェクトページ形式**（`username.github.io/blog`）:
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://username.github.io',
  base: '/blog',
});
```

**ユーザーページ形式**（`username.github.io`）:
- リポジトリ名を`username.github.io`にする
- `base`設定不要

### 2. .nojekyll ファイル

`public/.nojekyll` に空ファイルを配置:
```bash
touch public/.nojekyll
```

理由: Astroの`_astro`ディレクトリが Jekyll により無視されるのを防ぐ

### 3. GitHub Actions設定

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build with Astro
        uses: withastro/action@v5

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

### 4. リポジトリ設定

1. GitHub リポジトリの **Settings** → **Pages**
2. **Source**: "GitHub Actions" を選択
3. **Custom domain**（オプション）: ドメイン名を入力
4. **Enforce HTTPS**: 有効化（推奨）

## パフォーマンス期待値

- **ページ読み込み時間**: < 1.5秒（3G接続） - 憲法の要件2秒を上回る
- **最初のバイトまでの時間**: < 300ms - GitHub CDN経由
- **Lighthouse スコア**: 95-100点（すべてのカテゴリ）
- **Core Web Vitals**: すべてGreen
- **ビルド時間**: < 2分（記事100件以下、GitHub Actions）

*注: VercelのエッジCDNと比較してTTFBがやや劣る可能性があるが、静的サイトのため実用上問題なし*

## 開発環境

- **Node.js**: v18以上（推奨: v20 LTS）
- **パッケージマネージャー**: pnpm（推奨）またはnpm
- **エディタ**: VS Code + Astro公式拡張機能
- **Git**: バージョン管理とGitHub Pagesデプロイ

## 実装の段階的アプローチ

憲法の「段階的デリバリー」原則に従い、以下の順序で実装:

1. **Phase 1 (P1 - MVP)**: 記事閲覧機能
   - Astro + TypeScript + Tailwind CSSのセットアップ
   - Markdownベースの記事表示
   - レスポンシブデザイン
   - シンタックスハイライト
   - GitHub Pagesデプロイ設定

2. **Phase 2 (P2)**: カテゴリと検索
   - カテゴリフィルタリング
   - Pagefind検索統合

3. **Phase 3 (P3)**: 記事管理ワークフロー
   - フロントマター設定のドキュメント化
   - 公開/非公開管理
   - 記事作成テンプレート

## シンプルさの検証（憲法原則IV準拠）

**選定した技術がシンプルである理由**:

1. **Astro**: 設定がミニマル、ファイルベースルーティング、ゼロJavaScript by default
2. **TypeScript**: 型安全性により長期的にコードがシンプルに保たれる
3. **Tailwind CSS**: ユーティリティクラスで独自CSSを書く必要がない
4. **remark**: Astro内蔵、追加設定不要
5. **Shiki**: Astro設定1行で有効化
6. **Pagefind**: HTMLビルド後に自動インデックス化、設定ほぼ不要
7. **GitHub Pages**: Git pushだけで自動デプロイ、追加サービス不要

**GitHub Pages特有の追加設定**:
- `.nojekyll`ファイル追加（1行）
- `astro.config.mjs`に`site`と`base`追加（2行）
- GitHub Actions YAML設定（公式テンプレート使用、約30行）

**複雑性を避けた点**:
- データベース不要（ファイルベース）
- 認証システム不要（静的サイト）
- CMSなし（Markdown直接編集）
- バックエンドサーバー不要（完全静的）
- 外部サービス依存なし（GitHub完結）

## 憲法準拠チェック

- ✅ **I. コンテンツファースト開発**: Markdownベース、コンテンツ管理がシンプル
- ✅ **II. 段階的デリバリー**: 3つのフェーズで独立デプロイ可能
- ✅ **III. テスト規律**: 仕様にテスト要件なし（適用外）
- ✅ **IV. デフォルトでシンプル**: 必要最小限の技術スタック、データベース・サーバー不要
- ✅ **V. コードとしてのドキュメント**: Markdown + Gitで完全管理

## GitHub Pages制約による影響評価

### プラス面
- ✅ **完全無料**: 追加コスト一切なし
- ✅ **Git連携**: 既存ワークフローに統合
- ✅ **シンプル**: 外部サービス不要

### マイナス面（対策あり）
- ⚠️ **ベースURL設定**: `astro.config.mjs`で対応（設定2行）
- ⚠️ **ビルド時間**: GitHub Actions経由で若干遅延（実用上問題なし）
- ⚠️ **プレビューデプロイなし**: プルリクエストでのプレビュー機能なし（ローカル確認で対応）

**結論**: マイナス面は軽微で、完全無料のメリットが大きく上回る

## 次のステップ

Phase 1で以下を生成:
- `data-model.md`: ブログ記事とカテゴリのデータ構造（変更なし）
- `quickstart.md`: 開発環境セットアップと実行手順（**GitHub Pages対応版に更新**）
- `contracts/`: 必要なし（静的サイトのためAPIエンドポイントなし）

## Vercelとの比較まとめ

| 項目 | GitHub Pages | Vercel |
|------|-------------|--------|
| コスト | 完全無料 | 無料（商用利用は有料） |
| 設定 | やや複雑 | 最もシンプル |
| パフォーマンス | 良好 | 最高 |
| デプロイ速度 | 普通 | 高速 |
| プレビュー | なし | あり |
| 推奨度（完全無料要件） | ⭐⭐⭐⭐⭐ | ⭐⭐⭐☆☆ |

**最終結論**: ユーザーの完全無料要件を満たすため、**GitHub Pages + Astro + GitHub Actions**が最適解。
