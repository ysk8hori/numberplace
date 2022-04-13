# utils

## Difficulty と DifficultyName と Level

### Difficulty

- Difficulty は 数値であり、パズルにおいて空欄の数がそれぞれの数字（答えの候補）で最大でいくつとなるかを示す値である。
- 最小値は 1 である。Difficulty が 1 のパズルの空欄は、それぞれの数字で各 1 箇所のみとなる。
- 最大値は BlockSize によって異なる。`width * height` の値が最大値となる。BlockSize が `{width:3, height:2}` のサイズであれば最大値は 6 となる。
  - 最大値が指定された場合は、いずれかの数字（答えの候補）の確定セルが一つもないパズルの生成が行われる場合がある。
  - 最大値より 1 小さい値が指定された場合は、いずれの数字（答えの候補）も一箇所は確定した状態のパズルの生成が行われる。

### DifficultyName

ユーザーに提示する難易度の名前。ユーザーが Difficulty を理解しやすくするために「やさしい(easy)」「ふつう(normal)」「むずかしい(difficult)」のよう表現を見せる。

### Level

Level は パズルの難易度のパターンであり、BlockSize と Difficulty と DifficultyName の組み合わせで表現する。

DifficultyName と Difficulty の対応は BlockSize ごとに異なる。
例えば、BlockSize 1x3 の easy の Difficulty は 1 とするが、BlockSize 3x3 の easy の Difficulty は 6 辺りとする。
これは、1x3 はとても簡単な練習問題であり各数字（答えの候補）が 1 箇所ずつ空欄であっても有意義だが、 3x3 で本格的にパズルを楽しむシチュエーションにおいて各数字（答えの候補）が 1 箇所ずつ空欄の問題が生成されても全く有意義ではないから。
