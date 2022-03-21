import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, expect, fn } from 'vitest';
import { render, screen, userEvent } from '../../utils/test-utils';
import InputPanelButton from './InputPanelButton';

describe('InputPanelButton', () => {
  test('答えとなる文字列を表示する', () => {
    render(<InputPanelButton answerString="1" data-testid="input_1" />);
    expect(screen.getByTestId('input_1')).toHaveTextContent('1');
  });
});
