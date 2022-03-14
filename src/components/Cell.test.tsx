import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, it, expect } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';
import Cell from './Cell';

describe('hello', () => {
  it('should render the Cell', () => {
    render(<Cell />);
    expect(screen.getByText('1'));
  });
});
export {};
