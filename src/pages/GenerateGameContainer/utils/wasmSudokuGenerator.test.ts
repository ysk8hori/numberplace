import { BlockSize } from '@ysk8hori/numberplace-generator';
import { toMyGame, toRuleBits } from './wasmSudokuGenerator';

describe('wasmSudokuGenerator', () => {
  test('cross と hyper の指定を rule bits に反映できる', () => {
    expect(toRuleBits({})).toBe(0b001);
    expect(toRuleBits({ cross: true })).toBe(0b011);
    expect(toRuleBits({ hyper: true })).toBe(0b101);
    expect(toRuleBits({ cross: true, hyper: true })).toBe(0b111);
  });

  test('WASM から返る一次元配列を MyGame の cells に変換できる', () => {
    const blockSize: BlockSize = { width: 2, height: 2 };
    const values = new Uint8Array([
      1, 0, 3, 4, 0, 2, 0, 1, 2, 1, 4, 0, 3, 4, 1, 2,
    ]);

    const game = toMyGame({ values, blockSize });

    expect(game.cells).toHaveLength(16);
    expect(game.cells[0]).toEqual({ pos: [0, 0], answer: '1' });
    expect(game.cells[1]).toEqual({ pos: [1, 0], answer: '' });
    expect(game.cells[5]).toEqual({ pos: [1, 1], answer: '2' });
    expect(game.cells[15]).toEqual({ pos: [3, 3], answer: '2' });
  });

  test.todo(
    'WASM からの実生成テストは Browser Worker 環境で実行する (Node では fetch failed になる)',
  );
});
