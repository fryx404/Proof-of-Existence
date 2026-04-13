# AI Handoff: 3DCG Works Archive

## 📌 プロジェクト概要 (Overview)
- **Path**: `c:\Users\FRYX\Documents\WebSite\Proof-of-Existence`
- **Owner**: Takumi Furuya (FRYX) / Github: fryx404
- **プロジェクトの性質**: メインサイト（fryx404.github.io）からの3DCG作品閲覧用サブサイト。作品集に特化したシングルページ構成。
- **機能面**: Canvas APIでのパーティクルシステム、イマーシブモーダル（フルスクリーン詳細ビュー）、グラスモーフィズムUI。

## 💻 技術スタック (Tech Stack)
- **フロントエンド**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **ビルドツール**: なし (Vanilla構成)。`npm` やバンドラー不要。Live Server等でローカルプレビュー。

## 📁 アーキテクチャとファイル構成 (Architecture)
シングルページ構成。作品データはJSに記述、DOMを動的に生成。

- **`index.html`** (3DCG Works): 作品集トップページ（唯一のページ）
  - `styles/main.css` (CSS変数、ベーススタイル、パーティクル背景、戻りリンク)
  - `styles/works.css` (ギャラリーグリッド、イマーシブモーダル、レスポンシブ)
  - `scripts/main.js` (ParticleSystem, 時計)
  - `scripts/works.js` (**作品のマスターデータ `WORKS_DATA` がここに記述**。ギャラリー描画、イマーシブモーダル制御)

## 🛠️ AIエージェントへの作業指針 (Working Guidelines)

### 1. 作品データの管理
作品の追加・編集は `scripts/works.js` 内の `WORKS_DATA` 配列を編集。
- 画像パスは `images/works/...` を指定。
- 説明文(`description`)には、コンセプトに合った詩的なメッセージを記述。

### 2. デザインシステム (CSS Variables)
`styles/main.css`（`:root`）に定義されている存在論的命名規則のCSS変数を最優先で使用。
**例:**
- 基本色: `--void` (#000), `--existence` (#fff), `--liminal` (#0a0a0a)
- 透明度: `--whisper`, `--breath`, `--manifestation` など
- 空間設計: `--void-space`, `--whisper-space`, `--existence-space` など
デザインは**ダークテーマUIとミニマリズム**を堅持。

### 3. イマーシブモーダル
作品クリック時のフルスクリーン詳細ビュー:
- 画像を主役に大きく表示
- グラスモーフィズム情報パネル（backdrop-filter）
- 前後ナビゲーション（←→ボタン + キーボード）
- ESCで閉じる
- 作品カウンター表示（1/N）

### 4. 削除済み機能（復活させないこと）
- `about.html` / `about.css` / `about.js` （プロフィールページ）
- `works.html` （旧作品ページ、index.htmlに統合済み）
- 3ページナビゲーション（存在・作品・詳細のドットナビ）
- 「偶然の出会い」ランダム作品表示機能

### 5. 操作・変更時のルール
- 作品を追加した際は `README.md` の作品リストも同時に更新。
- JSやCSSは大きなファイルのため、編集ツール（`replace_file_content` / `multi_replace_file_content`）を活用し、破壊的変更を避ける。
- JavaScriptはクラスベース（`CreationGarden`, `ParticleSystem` 等）で構成。

### 6. テストと検証
Live Serverでの目視検証。ビルド不要、静的ファイルとしての整合性を担保。
