import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/test';
import GameContainer from '.';
import {
  blockSize_2_2,
  blockSize_2_3 as blockSize,
  puzzle_2_2,
  puzzle_2_3 as puzzle,
  solved_2_3,
  solved_2_2,
  blockSize_3_3,
  puzzle_3_3,
  solved_3_3,
} from '../../utils/samples';
import { inputAnswer, resolve_2_3 } from '../../utils/storybookUtils';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ReactModal from 'react-modal';
import { expect } from '@storybook/test';
import { atomOfGame, atomOfSolved, SaveData } from '../../atoms';
import { atomOfAnswerImageVariant } from '../../jotaiAtoms';
import { TestProvider } from '../../utils/test-utils';

export default {
  component: GameContainer,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12mini',
    },
  },
  decorators: [
    Story => {
      const game = {
        puzzle,
        blockSize,
        cross: false,
        hyper: false,
      } satisfies SaveData;
      return (
        <TestProvider
          initialValues={[
            [atomOfAnswerImageVariant, 'num'],
            [atomOfGame, game],
            [atomOfSolved, solved_2_3],
          ]}
        >
          <Story />
        </TestProvider>
      );
    },
  ],
} as Meta<typeof GameContainer>;

export const Primary: StoryObj<typeof GameContainer> = {};

export const IconMode: StoryObj<typeof GameContainer> = {
  decorators: [
    Story => {
      const game = {
        puzzle,
        blockSize,
        cross: false,
        hyper: false,
      } satisfies SaveData;
      return (
        <TestProvider
          initialValues={[
            [atomOfAnswerImageVariant, 'asobi'],
            [atomOfGame, game],
            [atomOfSolved, solved_2_3],
          ]}
        >
          <Story />
        </TestProvider>
      );
    },
  ],
};

export const Primary_2_2: StoryObj<typeof GameContainer> = {
  decorators: [
    Story => {
      const game = {
        puzzle: puzzle_2_2,
        blockSize: blockSize_2_2,
        cross: false,
        hyper: false,
      } satisfies SaveData;
      return (
        <TestProvider
          initialValues={[
            [atomOfGame, game],
            [atomOfSolved, solved_2_2],
          ]}
        >
          <Story />
        </TestProvider>
      );
    },
  ],
};

export const IPad: StoryObj<typeof GameContainer> = {
  parameters: {
    viewport: { defaultViewport: 'ipad' },
  },
};

export const Click2_3: StoryObj<typeof GameContainer> = {
  name: 'セルをクリックすると選択中となる',
  play: async ({ canvasElement }) => {
    // Starts querying the component from its root element
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('2,3'));
  },
};

export const FillableByPanel: StoryObj<typeof GameContainer> = {
  name: 'パネルのボタンから数字を入力できる',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('2,0'));
    await userEvent.click(canvas.getByRole('button', { name: '1' }));
  },
};

export const ClearModal: StoryObj<typeof GameContainer> = {
  name: 'クリア時にはクリアモーダルを表示する',
  play: async ({ canvasElement }) => {
    ReactModal.setAppElement(canvasElement);
    // モーダルが canvasElement の外に描画されモーダル内の要素が取れないので body を canvas にしないと動かない
    const canvas = within(canvasElement.parentElement!);
    await resolve_2_3(canvas, { finish: true });
    await expect(canvas.queryByText('クリア！')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '答え合わせ' }));
    await expect(canvas.getByText('クリア！')).toBeInTheDocument();
  },
};

export const MistakeModal: StoryObj<typeof GameContainer> = {
  name: 'ミスが有る状態で答え合わせボタンを謳歌した場合はミステイクモーダルを表示する',
  play: async ({ canvasElement }) => {
    ReactModal.setAppElement(canvasElement);
    // モーダルが canvasElement の外に描画されモーダル内の要素が取れないので body を canvas にしないと動かない
    const canvas = within(canvasElement.parentElement!);
    await inputAnswer(canvas, '0,0', '1');
    await expect(
      canvas.queryByText('間違いがあります'),
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '答え合わせ' }));
    await expect(canvas.getByText('間違いがあります')).toBeInTheDocument();
  },
};

export const Game_3_3: StoryObj<typeof GameContainer> = {
  name: '9x9の表示確認',
  decorators: [
    Story => {
      const game = {
        puzzle: puzzle_3_3,
        blockSize: blockSize_3_3,
        cross: false,
        hyper: false,
      } satisfies SaveData;
      return (
        <TestProvider
          initialValues={[
            [atomOfGame, game],
            [atomOfSolved, solved_3_3],
          ]}
        >
          <Story />
        </TestProvider>
      );
    },
  ],
};

export const Game_3_3_cross: StoryObj<typeof GameContainer> = {
  name: '9x9クロスの表示確認',
  decorators: [
    Story => {
      const game = {
        puzzle: puzzle_3_3,
        blockSize: blockSize_3_3,
        cross: true,
        hyper: false,
      } satisfies SaveData;
      return (
        <TestProvider
          initialValues={[
            [atomOfGame, game],
            [atomOfSolved, solved_3_3],
          ]}
        >
          <Story />
        </TestProvider>
      );
    },
  ],
};

export const Game_3_3_hyper: StoryObj<typeof GameContainer> = {
  name: '9x9HYPERの表示確認',
  decorators: [
    Story => {
      const game = {
        puzzle: puzzle_3_3,
        blockSize: blockSize_3_3,
        cross: false,
        hyper: true,
      } satisfies SaveData;
      return (
        <TestProvider
          initialValues={[
            [atomOfGame, game],
            [atomOfSolved, solved_3_3],
          ]}
        >
          <Story />
        </TestProvider>
      );
    },
  ],
};

export const Game_3_3_hyper_cross: StoryObj<typeof GameContainer> = {
  name: '9x9HYPERxCROSSの表示確認',
  decorators: [
    Story => {
      const game = {
        puzzle: puzzle_3_3,
        blockSize: blockSize_3_3,
        cross: true,
        hyper: true,
      } satisfies SaveData;
      return (
        <TestProvider
          initialValues={[
            [atomOfGame, game],
            [atomOfSolved, solved_3_3],
          ]}
        >
          <Story />
        </TestProvider>
      );
    },
  ],
};
