# Copilot Instruction: Numberplace Frontend + WASM Integration

## 1. 役割と目的

あなたは Numberplace（数独）アプリの開発を支援するエキスパートエンジニアです。
本リポジトリの React + TypeScript フロントエンドを改善しつつ、WASM 問題生成エンジン連携を壊さないことを目的とします。
主な対象は `src/` 配下のアプリ本体であり、仕様に沿った安全な変更と品質維持を重視します。

## 2. 開発環境と構成

- **コンテキストの共有:** 本プロジェクトは Vite ベースのフロントエンドアプリです。
- `src/` : React + TypeScript のアプリ本体（主な編集対象）
- `vendor/numberplace-generator-wasm/` : 問題生成エンジンの外部リポジトリ（通常は参照・ビルド対象）
- `public/` : 静的アセット
- `.storybook/` : Storybook 設定

- **技術スタック:** TypeScript, React, Vite, Vitest, Storybook, WASM（`wasm-pack` 経由で外部エンジンをビルド）

## 3. 作業時の行動指針

- 実装は必ず次の8手順で進めること
  1. 変更予定の一覧をテストファイルに書き出す（List）。`test.todo` などで仕様項目を先に明示し、必要に応じて現状確認として `pnpm run check` を実行する。
  2. テストを実装し実行して NG となることを確認する（Red）。`pnpm run check` を実行する。
  3. 最もシンプルな方法で OK とする（Green）。`pnpm run check` を実行する。
  4. 理想的な実装へリファクタリングする（Refactor）。`pnpm run check` を実行する。
  5. List がすべて完了したか確認する。完了条件は「List の各項目に対応するテストが存在し、すべて成功していること」とする。あわせて `pnpm run check` と `pnpm run build` を実行して成功を確認する。未完了の場合、仕様・List の不足なら 1 へ、テスト/実装の不足なら 2 へ戻ってループする。
  6. コンテキストを持たないサブエージェントでレビューする。サブエージェントの指摘が妥当かどうかを判断し、修正が必要であれば行う。戻り先は、仕様・Listの不足なら1へ、テスト/実装の不足なら2へ戻る。修正不要なら7へ進む。
  7. 私へレビュー依頼する。修正が必要であれば行う。戻り先は、仕様・Listの不足なら1へ、テスト/実装の不足なら2へ戻る。修正不要なら8へ進む。
  8. コミットを行う。

- 補足ルール
  - Node/TypeScript系の依存管理・スクリプト実行は `pnpm` を使用すること（`npm` は使わない）。
  - `git commit` コマンドを実行する前に、必ず手順6と手順7を完了し、レビュー結果（指摘なしを含む）を共有すること。
  - WASM 生成物は `pnpm run wasm:build` で更新すること。内部で `vendor/numberplace-generator-wasm/rust-src` に移動して `wasm-pack build --target web` を実行する。
  - `vendor/numberplace-generator-wasm/` は外部リポジトリであるため、原則として直接編集しない。編集が必要な場合は、ユーザーの明示指示がある場合に限る。
  - 開発時は `pnpm run dev`、検証時は `pnpm run check` / `pnpm run build` を優先して使用する。
  - UI 変更時は必要に応じて Storybook（`pnpm run storybook`）または関連テストで挙動確認する。
- コミット後にすべきこと
  - 私との会話をふりかえり、私の指示から私の考え方を推測し何らかの方針が見えた場合は、それに即した方針を copilot-instructions.md へ反映すること。
