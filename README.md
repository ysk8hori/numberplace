<h1 align="center">
  <img alt="numberp top image" src="./src/images/top.svg" style="width:400px;"/>
</h1>

ナンプレのゲームを遊べるアプリです。 バックエンドとの通信は不要で、静的なフロントエンドアプリケーションとして動作します。PWA としてインストールも可能。

子供でも遊べるよう優しい作りにします。

AWS にデプロイ済みです。
https://numberp.net

GitHub Pages にもデプロイしています。
https://ysk8hori.github.io/numberplace/

## 問題生成エンジン (WASM)

問題生成は [numberplace-generator-wasm](https://github.com/ysk8hori/numberplace-generator-wasm/tree/main) を利用します。

初回または更新時は、以下を実行してください。

```bash
pnpm run wasm:build
```

`pnpm install` 後は `postinstall` により自動で `pnpm run wasm:build` が実行されます。

このコマンドで以下を行います。

- `vendor/numberplace-generator-wasm` にライブラリを取得または更新
- `wasm-pack build --target web` で `rust-src/pkg` を生成

## プレイ画面

<div style="display:flex;">
<img height="300" alt="image" src="https://user-images.githubusercontent.com/5052869/206936641-ab63052d-8444-4248-944a-0bf3e9e464c2.png">
<img height="300" alt="image" src="https://user-images.githubusercontent.com/5052869/206937168-74b4e4e8-27e0-48da-9375-a14f17c6d6c0.png">
<img height="300" alt="image" src="https://user-images.githubusercontent.com/5052869/206937196-54b941de-4ea2-42d1-bd6d-5597d959831b.png">
</div>
