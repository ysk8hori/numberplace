import '@testing-library/jest-dom';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import React from 'react';
import ReactModal from 'react-modal';
import { describe, test, expect, fn } from 'vitest';
import { isSamePos } from '../utils/positionUtils';
import {
  render,
  screen,
  userEvent,
  puzzle_2_2,
  corrected_2_2,
  blockSize_2_2,
  puzzle_2_3,
  blockSize_2_3,
  corrected_2_3,
  resolve_2_3,
} from '../utils/test-utils';
import LoadGameContainer from './LoadGameContainer';

function setup({
  size,
  onRegenerate = () => undefined,
}: {
  size: '2_2' | '2_3';
  onRegenerate?: (blockSize: BlockSize) => undefined;
}) {
  const [puzzle, corrected, blockSize] =
    size === '2_2'
      ? [puzzle_2_2, corrected_2_2, blockSize_2_2]
      : [puzzle_2_3, corrected_2_3, blockSize_2_3];
  const rendered = render(
    <LoadGameContainer
      puzzle={puzzle}
      corrected={corrected}
      blockSize={blockSize}
      onRegenerate={onRegenerate}
    />,
  );
  ReactModal.setAppElement(rendered.container);
}

test('ゲームクリア後に「おなじ おおきさで あそぶ」をクリックすると onRegenerate に blockSize が引数で渡されてコールバックされる', () => {
  const onRegenerate = fn();
  setup({ size: '2_3', onRegenerate });
  resolve_2_3({ finish: true });
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  userEvent.click(
    screen.getByRole('button', { name: 'おなじ おおきさで あそぶ' }),
  );
  expect(onRegenerate).toBeCalledWith(blockSize_2_3);
});
