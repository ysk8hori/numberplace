import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '../../utils/test-utils';
import MistakeNoticeModal from './MistakeNoticeModal';

// popover API のモック
// テスト環境では Popover API がサポートされていないため、showPopover/hidePopover をモック化する
beforeEach(() => {
  HTMLElement.prototype.showPopover = vi.fn();
  HTMLElement.prototype.hidePopover = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('モーダルに「間違いがあります」を表示する', async () => {
  render(<MistakeNoticeModal hasMistake={true} />);
  expect(screen.getByText('間違いがあります')).toBeInTheDocument();
});
