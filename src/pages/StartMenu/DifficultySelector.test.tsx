import '@testing-library/jest-dom';
import React from 'react';
import {
  render,
  screen,
  userEvent,
  blockSize_2_2,
} from '../../utils/test-utils';
import DifficultySelector from './DifficultySelector';

it('左矢印クリックすると与えた難易度をデクリメントした値を onSelect で通知する', async () => {
  const onSelect = vi.fn();
  render(
    <DifficultySelector
      difficulty={'normal'}
      blockSize={blockSize_2_2}
      onSelect={onSelect}
    />,
  );
  await userEvent.click(screen.getByRole('button', { name: '易しくする' }));
  expect(onSelect).toHaveBeenCalledWith('easy');
});

it('右矢印クリックすると与えた難易度をインクリメントした値を onSelect で通知する', async () => {
  const onSelect = vi.fn();
  render(
    <DifficultySelector
      difficulty={'normal'}
      blockSize={blockSize_2_2}
      onSelect={onSelect}
    />,
  );
  await userEvent.click(screen.getByRole('button', { name: '難しくする' }));
  expect(onSelect).toHaveBeenCalledWith('hard');
});
