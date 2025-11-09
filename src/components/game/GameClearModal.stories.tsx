import React from 'react';
import { StoryObj, Meta } from '@storybook/react-vite';
import GameClearModal from './GameClearModal';

export default {
  component: GameClearModal,
} as Meta<typeof GameClearModal>;

export const Default: StoryObj<typeof GameClearModal> = {
  name: 'ゲームクリアした際に表示する',
};
export const SmallMobile: StoryObj<typeof GameClearModal> = {
  name: 'モバイル端末での表示',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
