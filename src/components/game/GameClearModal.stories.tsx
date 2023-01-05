import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameClearModal from './GameClearModal';

export default {
  component: GameClearModal,
} as ComponentMeta<typeof GameClearModal>;

const Template: ComponentStory<typeof GameClearModal> = args => (
  <GameClearModal {...args} />
);

export const Cleared = Template.bind({});
Cleared.storyName = 'ゲームクリアした際に表示する';
