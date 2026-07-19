import initWasm, {
  generate_sudoku,
} from '../../../../vendor/numberplace-generator-wasm/rust-src/pkg/rust_src.js';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { MyGame } from '../../../utils/typeUtils';

const RULE_STANDARD = 0b001;
const RULE_CROSS = 0b010;
const RULE_HYPER = 0b100;

let wasmInitPromise: Promise<void> | undefined;

async function ensureWasmInitialized(): Promise<void> {
  if (!wasmInitPromise) {
    wasmInitPromise = initWasm()
      .then(() => undefined)
      .catch((error: unknown) => {
        wasmInitPromise = undefined;
        throw new Error(
          `WASM の初期化に失敗しました: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      });
  }
  await wasmInitPromise;
}

export async function generateWithWasm({
  blockSize,
  cross,
  hyper,
  seed,
}: {
  blockSize: BlockSize;
  cross?: boolean;
  hyper?: boolean;
  seed?: bigint;
}): Promise<{ puzzle: MyGame; solved: MyGame }> {
  await ensureWasmInitialized();

  const generated = generate_sudoku(
    blockSize.width,
    blockSize.height,
    toRuleBits({ cross, hyper }),
    seed ?? BigInt(Date.now()),
  );

  return {
    puzzle: toMyGame({
      values: generated.take_puzzle(),
      blockSize,
    }),
    solved: toMyGame({
      values: generated.take_solved(),
      blockSize,
    }),
  };
}

export function toRuleBits({
  cross,
  hyper,
}: {
  cross?: boolean;
  hyper?: boolean;
}): number {
  let bits = RULE_STANDARD;
  if (cross) bits |= RULE_CROSS;
  if (hyper) bits |= RULE_HYPER;
  return bits;
}

export function toMyGame({
  values,
  blockSize,
}: {
  values: Uint8Array;
  blockSize: BlockSize;
}): MyGame {
  const side = blockSize.width * blockSize.height;
  return {
    cells: Array.from(values).map((value, index) => {
      const x = index % side;
      const y = Math.floor(index / side);
      return {
        pos: [x, y],
        answer: value === 0 ? '' : String(value),
      };
    }),
  };
}
