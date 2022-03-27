# Numberplace

ナンプレのゲームを遊べるアプリです。 React と vite を使い、 PWA として構築する予定です。バックエンドとの通信は不要で、静的なフロントエンドアプリケーションとして動作します。

子供でも遊べるよう優しい作りにします。

## TODO

- [x] パズルとして提供された答えは変更不可能とする
- [x] ~全てのセルに答えを記入したら~「答え合わせ」ボタンを押下したら、答え合わせするかどうかの確認ダイアログを出す。
- [x] ダイアログを閉じれる
- [ ] ダイアログ表示中は選択中セル変更不可
- [ ] ダイアログ表示中は記入不可
- [ ] 答え合わせをする
  - [x] ~間違えがある場合はハイライトする。~ 正解した Cell は変更不可とする。
  - [x] 間違いがある場合はその旨を知らせてゲームを続行する
  - [x] 間違いがない場合はクリアのエフェクトと、クリア後のメニューを出す。
- [ ] ギブアップできる。ギブアップするとクリア後と同じメニューを出す。
- [ ] クリア後のメニューから、リトライ可能とする
- [ ] クリア後のメニューから、同じサイズで異なる問題をプレイ可能とする
- [ ] スタート画面を作る。
  - [ ] スタート画面では問題のサイズを選べる
- [ ] クリア後のメニューからスタート画面へ遷移できる
