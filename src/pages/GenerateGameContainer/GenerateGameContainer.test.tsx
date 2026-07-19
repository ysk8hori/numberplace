import '@testing-library/jest-dom';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  blockSize_2_3,
  puzzle_2_3,
  render,
  screen,
  solved_2_3,
  TestProvider,
  userEvent,
} from '../../utils/test-utils';
import GenerateGameContainer from './GenerateGameContainer';

const { useGenerateGameMock } = vi.hoisted(() => ({
  useGenerateGameMock: vi.fn(),
}));

vi.mock('./utils/useGenerateGame', () => ({
  default: useGenerateGameMock,
}));

beforeEach(() => {
  useGenerateGameMock.mockReset();
  useGenerateGameMock.mockReturnValue({
    data: {
      puzzle: structuredClone(puzzle_2_3),
      solved: structuredClone(solved_2_3),
    },
  });
});

function setup() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <TestProvider initialValues={[]}>
        <GenerateGameContainer blockSize={blockSize_2_3} difficulty="normal" />
      </TestProvider>
    </QueryClientProvider>,
  );
}

test('生成した問題は初期表示時にゲーム盤面を表示する', async () => {
  setup();

  expect(
    await screen.findByRole('button', { name: '答え合わせ' }),
  ).toBeInTheDocument();
  expect(screen.getByTestId('0,0')).toBeInTheDocument();
});

test('生成した問題は解答を入力してもゲーム盤面を表示し続ける', async () => {
  setup();

  expect(
    await screen.findByRole('button', { name: '答え合わせ' }),
  ).toBeInTheDocument();
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-answer');

  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('6');

  expect(
    screen.getByRole('button', { name: '答え合わせ' }),
  ).toBeInTheDocument();
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-answer', '6');
});
