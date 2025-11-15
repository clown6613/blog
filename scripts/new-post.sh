#!/bin/bash

# 新しいブログ記事を作成するスクリプト

# 使い方チェック
if [ "$#" -lt 2 ]; then
    echo "使い方: ./scripts/new-post.sh <タイトル> <カテゴリ>"
    echo "例: ./scripts/new-post.sh \"TypeScriptの基礎\" tech"
    echo "カテゴリ: tech または hobby"
    exit 1
fi

TITLE="$1"
CATEGORY="$2"

# カテゴリチェック
if [ "$CATEGORY" != "tech" ] && [ "$CATEGORY" != "hobby" ]; then
    echo "エラー: カテゴリは 'tech' または 'hobby' を指定してください"
    exit 1
fi

# 現在の日付を取得
DATE=$(date +%Y-%m-%d)

# タイトルからスラッグを生成（簡易版）
SLUG=$(echo "$TITLE" | iconv -t ascii//TRANSLIT 2>/dev/null || echo "$TITLE" | sed 's/[^a-zA-Z0-9]/-/g' | tr '[:upper:]' '[:lower:]' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')

# ファイル名を生成
FILENAME="${DATE}-${SLUG}.md"
FILEPATH="src/content/posts/${CATEGORY}/${FILENAME}"

# ファイルが既に存在するかチェック
if [ -f "$FILEPATH" ]; then
    echo "エラー: ファイルが既に存在します: $FILEPATH"
    exit 1
fi

# テンプレートから記事を作成
cat > "$FILEPATH" << EOF
---
title: "$TITLE"
pubDate: $DATE
published: false
category: "$CATEGORY"
description: ""
tags: []
---

# $TITLE

記事の内容をここに書きます。

## セクション1

内容...

## まとめ

まとめ...
EOF

echo "✅ 記事を作成しました: $FILEPATH"
echo ""
echo "次のステップ:"
echo "1. エディタで $FILEPATH を編集"
echo "2. published: true に変更して公開"
echo "3. git add . && git commit -m \"Add: $TITLE\" && git push"
echo ""

# VS Codeで開く（オプション）
if command -v code &> /dev/null; then
    read -p "VS Codeで開きますか？ (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        code "$FILEPATH"
    fi
fi
