import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import GameClearModal from './GameClearModal';

export default {
  component: GameClearModal,
} as Meta<typeof GameClearModal>;

const Template: ComponentStory<typeof GameClearModal> = args => (
  <GameClearModal {...args} />
);

export const Cleared = Template.bind({});
Cleared.storyName = 'ゲームクリアした際に表示する';
