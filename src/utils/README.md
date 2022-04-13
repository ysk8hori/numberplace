# utils

## maxEmptyCount と Difficulty と Level

### maxEmptyCount

- maxEmptyCount は 数値であり、パズルにおいて空欄の数がそれぞれの数字（答えの候補）で最大でいくつとなるかを示す値である。
- 最小値は 1 である。maxEmptyCount が 1 のパズルの空欄は、それぞれの数字で各 1 箇所のみとなる。
- 最大値は BlockSize によって異なる。`width * height` の値が最大値となる。BlockSize が `{width:3, height:2}` のサイズであれば最大値は 6 となる。
  - 最大値が指定された場合は、いずれかの数字（答えの候補）の確定セルが一つもないパズルの生成が行われる場合がある。
  - 最大値より 1 小さい値が指定された場合は、いずれの数字（答えの候補）も一箇所は確定した状態のパズルの生成が行われる。

### Difficulty

ユーザーに提示する難易度の名前。ユーザーが maxEmptyCount を理解しやすくするために「やさしい(easy)」「ふつう(normal)」「むずかしい(difficult)」のよう表現を見せる。

### Level

Level は パズルの難易度のパターンであり、BlockSize と maxEmptyCount と Difficulty の組み合わせで表現する。

Difficulty と maxEmptyCount の対応は BlockSize ごとに異なる。
例えば、BlockSize 1x3 の easy の maxEmptyCount は 1 とするが、BlockSize 3x3 の easy の maxEmptyCount は 6 辺りとする。
これは、1x3 は初心者向け練習問題として存在意義があり各数字（答えの候補）が 1 箇所ずつ空欄であったとしても有意義だが、 3x3 で本格的にパズルを楽しむシチュエーションにおいて各数字（答えの候補）が 1 箇所ずつ空欄の問題が生成されても有意義ではないから。
