import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameClearModal from './GameClearModal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: GameClearModal,
} as ComponentMeta<typeof GameClearModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GameClearModal> = args => (
  <GameClearModal {...args} />
);

export const Cleared = Template.bind({});
Cleared.storyName = 'ゲームクリアした際に表示する';
