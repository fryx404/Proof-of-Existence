# 3DCG作品集特化サイトへの改修

メインサイト（fryx404.github.io）から3D作品集への導線として機能する、作品閲覧に特化したサイトに改修する。

## 現状の構成

| ファイル | 役割 | 改修後 |
|---------|------|--------|
| `index.html` | 哲学的ランディングページ（ポータル） | **作品集ページに置き換え** |
| `works.html` | 作品一覧ギャラリー | **削除**（index.htmlに統合） |
| `about.html` | プロフィール・タイムライン | **削除** |
| `scripts/main.js` | パーティクル・時計・ポータル | **パーティクルと時計のみ残す** |
| `scripts/works.js` | WORKS_DATA + ギャラリー生成 | **モーダル刷新** |
| `styles/main.css` | CSS変数・ベース・ナビ | **ナビ削除、ベースのみ残す** |
| `styles/works.css` | ギャラリー・モーダルスタイル | **モーダル全面刷新** |
| `styles/about.css` | Aboutページ専用 | **削除** |

## 削除する機能

- 3ページナビゲーション（存在・作品・詳細のドットナビ）
- 「偶然の出会い」ボタン（ヘッダー + 右下フローティング）
- トップページの哲学的ランディング（ポータルリング等）
- Aboutページ全体

## Proposed Changes

### HTML

#### [MODIFY] [index.html](file:///c:/Users/FRYX/Documents/WebSite/Proof-of-Existence/index.html)
- works.html の構造をベースに全面書き換え
- ナビゲーション削除（メインサイトへの「← Back」リンクのみ配置）
- 「偶然の出会い」ボタン削除
- ヘッダーをシンプルなタイトル + 作品数表示に
- 作品グリッド + モーダルのHTML構造を配置
- works.css と works.js を読み込む

#### [DELETE] [works.html](file:///c:/Users/FRYX/Documents/WebSite/Proof-of-Existence/works.html)
- index.html に統合されるため削除

#### [DELETE] [about.html](file:///c:/Users/FRYX/Documents/WebSite/Proof-of-Existence/about.html)
- 不要になるため削除

---

### JavaScript

#### [MODIFY] [works.js](file:///c:/Users/FRYX/Documents/WebSite/Proof-of-Existence/scripts/works.js)
- `showRandomWork()` メソッドと関連イベント削除
- **モーダルを全面刷新**:
  - 現在: 中央に800px幅のボックス表示、テキスト情報中心
  - 改修後: **フルスクリーンイマーシブビュー**
    - 画像をビューポート全体に大きく表示
    - グラスモーフィズムの情報パネルをオーバーレイ
    - 前後の作品へのナビゲーション矢印（←→）
    - キーボードナビゲーション対応（←→キー）
    - 外部リンクボタンのデザイン強化
    - 開閉時のシネマティックなアニメーション

#### [MODIFY] [main.js](file:///c:/Users/FRYX/Documents/WebSite/Proof-of-Existence/scripts/main.js)
- `setupPortalAnimations()` 削除（ポータルが無くなるため）
- パーティクルシステムと時計は維持

---

### CSS

#### [MODIFY] [main.css](file:///c:/Users/FRYX/Documents/WebSite/Proof-of-Existence/styles/main.css)
- ナビゲーション関連スタイル削除（`.ethereal-nav`, `.nav-dot` 等）
- ポータル関連スタイル削除（`.existence-portal`, `.portal-ring` 等）
- セクション切り替え関連削除
- CSS変数・ベーススタイル・パーティクル・時計は維持
- メインサイトへの戻りリンク用スタイル追加

#### [MODIFY] [works.css](file:///c:/Users/FRYX/Documents/WebSite/Proof-of-Existence/styles/works.css)
- 「偶然の出会い」ボタンスタイル削除
- **モーダルスタイル全面刷新**:
  - フルスクリーンレイアウト
  - 画像を中心に据えた大胆な構成
  - グラスモーフィズムの情報オーバーレイ
  - ナビゲーション矢印のスタイル
  - シネマティックな開閉アニメーション
  - レスポンシブ対応（モバイルではスクロール型レイアウト）

#### [DELETE] [about.css](file:///c:/Users/FRYX/Documents/WebSite/Proof-of-Existence/styles/about.css)
- 不要になるため削除

---

## モーダル改修の詳細デザイン

現在のモーダルは小さなボックス内にテキスト情報を詰め込んだだけのシンプルな設計。以下のように刷新する：

### デスクトップ（768px以上）
```
┌──────────────────────────────────────────┐
│  ← →                                  ✕ │
│                                          │
│   ┌──────────────────────────────────┐   │
│   │                                  │   │
│   │         フルサイズ画像            │   │
│   │                                  │   │
│   │                                  │   │
│   └──────────────────────────────────┘   │
│                                          │
│   ┌─────────────────────────────────┐    │
│   │  glassmorphism info panel       │    │
│   │  タイトル / 説明 / ツール / URL  │    │
│   └─────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

### 特徴
- **画像ファースト**: 画像が視覚的な主役
- **グラスモーフィズム**: 情報パネルは半透明のブラーサーフェス
- **前後ナビ**: ← → ボタンまたはキーボードで作品を切り替え
- **スムーズアニメーション**: フェード + スケールで開閉
- **背景ブラー**: 背景のギャラリーがぼやけて没入感を演出

## Verification Plan

### ブラウザ確認
- Live Serverでindex.htmlを開き、以下を検証:
  1. 作品グリッドが正しく表示される
  2. モーダルの開閉が正常動作する
  3. 前後ナビゲーションが機能する
  4. キーボード操作（ESC、←→）が動作する
  5. メインサイトへの戻りリンクが正しい
  6. レスポンシブ表示（モバイル幅）
  7. works.html へのアクセスが404になることを確認（削除済み）
