![Career Launchのkv写真です](/kv.jpg)

# 就活スクール Career Launch (架空サイト)

## 概要

Hello Mentorで提供されていた 就活スクールサイト「Career Launch」の自主制作です。
Figmaのデザインカンプをもとに、レスポンシブ対応でコーディングしました。

初めてViteを用いた作成をコーディングをしました。
デザイン部分をパーツで分けております。
また、各項目をvite.config.jsから入力できるようにしており、以下の内容が入力・変更が容易となっています。

・head内のtitle,description
・Topページ・Newsページお知らせ項目URL、日付、記事タイトル
・Aboutページの画像・職業・名前
・ServiceページのURL、画像、テキスト内容
・Recruitページの募集職種一覧内容

## 制作期間

2026年4月(約4日)

## 公開URL

[https://career-launch.kazunori-folio.com/](https://career-launch.kazunori-folio.com/)

## 必要環境

- Node.js `^20.19.0` または `>=22.12.0`

## セットアップ

```bash
cp .env.example .env
npm install
```

`.env.example` を `.env` にコピーし、必要に応じてサイト名等を編集してください。

## コマンド

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバー起動（HMR付き） |
| `npm run build` | 本番ビルド → `dist/` に出力 |
| `npm run build:staging` | ステージング用ビルド（サブディレクトリ対応） |
| `npm run preview` | ビルド結果のプレビュー |

## ディレクトリ構成

```
.
├── src/
│   ├── index.html                 # トップページ
│   ├── about.html                 # Aboutページ
│   ├── contact.html               # Contactページ
│   ├── 404.html                   # エラーページ
│   ├── news.html                  # Newsページ
│   ├── recruit.html               # Recruitページ
│   ├── service.html               # Serviceページ
│   ├── parts/                     # Handlebars パーシャル
│   │   ├── head.html              #   共通 <head>（メタ情報・favicon）
│   │   ├── header.html            #   ヘッダー / ナビゲーション
│   │   ├── entry-button.html      #   エントリーボタン
│   │   ├── news-list.html         #   ニュースリスト
│   │   ├── sub-kv.html            #   下層ページのkv
│   │   ├── view-more-button.html  #   view-more-button
│   │   └── footer.html            #   フッター
│   ├── js/
│   │   ├── main.js                # JSエントリーポイント
│   │   ├── modules/               # 機能モジュール
│   │   └── utils/                 # ユーティリティ
│   ├── styles/
│   │   ├── style.scss             # SCSSエントリーポイント
│   │   ├── foundation/            # リセット・ベーススタイル
│   │   ├── global/                # 変数・ブレイクポイント・色など
│   │   ├── layout/                # ヘッダー・フッター・コンテナ
│   │   ├── component/             # ボタン・タイトルなど共通コンポーネント
│   │   ├── page/                  # ページ固有スタイル
│   │   └── utility/               # ユーティリティクラス
│   └── assets/
│       ├── images/                # 画像ファイル
│       └── favicon.svg            # ファビコン元画像（512x512推奨）
├── plugins/                       # カスタムViteプラグイン
│   ├── vite-plugin-avif-convert.js  # JPG/PNG → AVIF 自動変換
│   └── vite-plugin-favicon.js       # ファビコン自動生成
├── dist/                          # ビルド出力（自動生成）
├── vite.config.js
├── postcss.config.js
├── .prettierrc
├── .env                           # 共通環境変数
├── .env.production                # 本番環境変数
├── .env.staging                   # ステージング環境変数
└── .vscode/
    └── settings.json              # 保存時自動整形設定
```

## 主な機能

### 1. ページ固有メタ情報（SEO対応）

`vite.config.js` の `pageData` にページごとの `title` / `description` を定義。Handlebarsの変数機能で `src/parts/head.html` に展開されます。

```js
// vite.config.js
const pageData = {
  '/index.html': {
    title: 'トップページ | サイト名',
    description: 'ページの説明文です。',
  },
  '/about.html': {
    title: 'About | サイト名',
    description: 'Aboutページの説明文です。',
  },
};
```

各ページの `<title>`, `<meta description>`, OGタグが自動で切り替わります。

### 2. HTML テンプレート (Handlebars)

`src/parts/` にパーシャルHTMLを配置し、各ページでインクルードできます。

```html
{{> head}}       <!-- 共通 <head>（メタ情報・favicon・CSS/JS読み込み） -->
{{> header}}     <!-- ヘッダー / ナビゲーション -->
{{> footer}}     <!-- フッター -->
```

### 3. パスエイリアス（@記法）

JSファイル内で `@` プレフィックスによるインポートが使えます。階層が深くなっても `../../` を書く必要がありません。

```js
import { log } from '@js/utils/logger.js';
import '@styles/style.scss';
```

| エイリアス | パス |
| --- | --- |
| `@` | `src/` |
| `@js` | `src/js/` |
| `@styles` | `src/styles/` |
| `@images` | `src/assets/images/` |

### 4. SCSS（FLOCSS構成）

FLOCSS ベースのディレクトリ構成。変数・ミックスインは `global/` に集約し、各ファイルから `@use "../global" as g;` で参照します。

```scss
@use "../global" as g;

.example {
  @include g.mq(md) {
    font-size: 18px;
  }
}
```

`autoprefixer` によりベンダープレフィックスが自動付与されます。

### 5. 画像最適化・AVIF自動変換

- **ビルド時圧縮**: `vite-plugin-image-optimizer` (Sharp) が PNG/JPEG/WebP/AVIF を自動圧縮
- **AVIF変換**: カスタムプラグインが JPG/PNG を AVIF に自動変換し、HTMLの参照パスも書き換え
- **SVG最適化**: `vite-plugin-svgo` (SVGO) で SVG を最適化

ソース画像は `src/assets/images/` に JPG/PNG のまま配置するだけで、ビルド後は AVIF に変換されます。

### 6. ファビコン自動生成

`src/assets/favicon.svg`（または任意の画像）を元に、ビルド時に以下を自動生成します。

| ファイル | 用途 |
| --- | --- |
| `favicon-16x16.png` | ブラウザタブ |
| `favicon-32x32.png` | ブラウザタブ（高解像度） |
| `apple-touch-icon.png` | iOS ホーム画面 |
| `android-chrome-192x192.png` | Android ホーム画面 |
| `android-chrome-512x512.png` | Android スプラッシュ |
| `site.webmanifest` | PWA マニフェスト |

元画像を差し替えるだけで全サイズが更新されます。

### 7. サイトマップ・robots.txt 自動生成

`vite-plugin-sitemap` がビルド時に `dist/sitemap.xml` と `dist/robots.txt` を自動生成します。ホスト名は `.env.production` の `VITE_SITE_URL` から取得されます。

### 8. 環境別ビルド（base パス切り替え）

`.env` ファイルで `base` パスとサイトURLを環境ごとに切り替えられます。

```bash
# 本番ビルド（base: /）
npm run build

# ステージングビルド（base: /test/project/）
npm run build:staging
```

| ファイル | 用途 | 設定例 |
| --- | --- | --- |
| `.env` | 共通設定 | `VITE_SITE_NAME=Static Site` |
| `.env.production` | 本番 | `VITE_BASE=/` `VITE_SITE_URL=https://example.com` |
| `.env.staging` | ステージング | `VITE_BASE=/test/project/` `VITE_SITE_URL=https://staging.example.com` |

ステージングビルドでは、ナビゲーション・アセット・ファビコン・マニフェストのすべてのパスが自動的にサブディレクトリ付きに変換されます。

### 9. コード整形 (Prettier)

保存時に Prettier が自動実行されます（VSCode + [Prettier 拡張機能](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) が必要）。

設定: セミコロンあり / シングルクォート / タブ幅 2 / 末尾カンマあり

## ページ追加方法

1. `src/` に新しい HTML ファイルを作成（`{{> head}}` `{{> header}}` `{{> footer}}` を含める）
2. `vite.config.js` の `pageData` にメタ情報を追加
3. `vite.config.js` の `build.rollupOptions.input` にエントリーを追加

```js
// pageData に追加
'/newpage.html': {
  title: '新しいページ | Static Site',
  description: '新しいページの説明文です。',
},

// input に追加
newpage: resolve(__dirname, 'src/newpage.html'),
```

## 技術スタック

| カテゴリ | ツール |
| --- | --- |
| ビルド | Vite 8 (Rolldown) |
| テンプレート | vite-plugin-handlebars |
| CSS | Sass (SCSS) + autoprefixer |
| 画像最適化 | vite-plugin-image-optimizer (Sharp) |
| AVIF変換 | カスタムプラグイン (Sharp) |
| SVG最適化 | vite-plugin-svgo (SVGO) |
| ファビコン | カスタムプラグイン (Sharp) |
| サイトマップ | vite-plugin-sitemap |
| コード整形 | Prettier |
