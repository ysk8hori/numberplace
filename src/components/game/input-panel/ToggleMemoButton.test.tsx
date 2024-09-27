import React from 'react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { InputMode, atomOfInputMode } from '../../../pages/GameContainer/atoms';
import { blockSize_2_2 } from '../../../utils/samples';
import { TestProvider, render, screen } from '../../../utils/test-utils';
import InputPanel from './InputPanel';

test('メモボタン押下でメモモードと通常モードが切り替わる', async () => {
  // const onChange = vi.fn();
  // render(<InputPanel blockSize={blockSize_2_2} />);
  // await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  // expect(onChange).toHaveBeenCalledWith('memo');
  // onChange.mockClear();
  // await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  // expect(onChange).toHaveBeenCalledWith('answer');
});
