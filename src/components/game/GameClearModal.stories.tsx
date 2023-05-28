import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import GameClearModal from './GameClearModal';

export default {
  component: GameClearModal,
} as Meta<typeof GameClearModal>;

const Template: StoryFn<typeof GameClearModal> = args => (
  <GameClearModal {...args} />
);

export const Cleared = Template.bind({});
Cleared.storyName = 'ゲームクリアした際に表示する';
