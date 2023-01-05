import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
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
import { expect } from '@storybook/jest';
import { useSetRecoilState } from 'recoil';
import { atomOfAnswerImageVariant, atomOfGame } from '../../atoms';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
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
      const setIconMode = useSetRecoilState(atomOfAnswerImageVariant);
      setIconMode('num');
      return <Story />;
    },
    Story => {
      const setGame = useSetRecoilState(atomOfGame);
      setGame({
        puzzle,
        solved: solved_2_3,
        blockSize,
        cross: false,
        hyper: false,
      });
      return <Story />;
    },
  ],
} as ComponentMeta<typeof GameContainer>;

export const Primary: ComponentStoryObj<typeof GameContainer> = {};

export const IconMode: ComponentStoryObj<typeof GameContainer> = {
  decorators: [
    Story => {
      const setIconMode = useSetRecoilState(atomOfAnswerImageVariant);
      setIconMode('asobi');
      return <Story />;
    },
  ],
};

export const Primary_2_2: ComponentStoryObj<typeof GameContainer> = {
  decorators: [
    Story => {
      const setGame = useSetRecoilState(atomOfGame);
      setGame({
        puzzle: puzzle_2_2,
        solved: solved_2_2,
        blockSize: blockSize_2_2,
        cross: false,
        hyper: false,
      });
      return <Story />;
    },
  ],
};

export const IPad: ComponentStoryObj<typeof GameContainer> = {
  parameters: {
    viewport: { defaultViewport: 'ipad' },
  },
};

export const Click2_3: ComponentStoryObj<typeof GameContainer> = {
  name: 'セルをクリックすると選択中となる',
  play: async ({ canvasElement }) => {
    // Starts querying the component from its root element
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('2,3'));
  },
};

export const FillableByPanel: ComponentStoryObj<typeof GameContainer> = {
  name: 'パネルのボタンから数字を入力できる',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('2,0'));
    await userEvent.click(canvas.getByRole('button', { name: '1' }));
  },
};

export const ClearModal: ComponentStoryObj<typeof GameContainer> = {
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

export const MistakeModal: ComponentStoryObj<typeof GameContainer> = {
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

export const Game_3_3: ComponentStoryObj<typeof GameContainer> = {
  name: '9x9の表示確認',
  decorators: [
    Story => {
      const setGame = useSetRecoilState(atomOfGame);
      setGame({
        puzzle: puzzle_3_3,
        solved: solved_3_3,
        blockSize: blockSize_3_3,
        cross: false,
        hyper: false,
      });
      return <Story />;
    },
  ],
};

export const Game_3_3_cross: ComponentStoryObj<typeof GameContainer> = {
  name: '9x9クロスの表示確認',
  decorators: [
    Story => {
      const setGame = useSetRecoilState(atomOfGame);
      setGame({
        puzzle: puzzle_3_3,
        solved: solved_3_3,
        blockSize: blockSize_3_3,
        cross: true,
        hyper: false,
      });
      return <Story />;
    },
  ],
};

export const Game_3_3_hyper: ComponentStoryObj<typeof GameContainer> = {
  name: '9x9HYPERの表示確認',
  decorators: [
    Story => {
      const setGame = useSetRecoilState(atomOfGame);
      setGame({
        puzzle: puzzle_3_3,
        solved: solved_3_3,
        blockSize: blockSize_3_3,
        cross: false,
        hyper: true,
      });
      return <Story />;
    },
  ],
};

export const Game_3_3_hyper_cross: ComponentStoryObj<typeof GameContainer> = {
  name: '9x9HYPERxCROSSの表示確認',
  decorators: [
    Story => {
      const setGame = useSetRecoilState(atomOfGame);
      setGame({
        puzzle: puzzle_3_3,
        solved: solved_3_3,
        blockSize: blockSize_3_3,
        cross: true,
        hyper: true,
      });
      return <Story />;
    },
  ],
};
