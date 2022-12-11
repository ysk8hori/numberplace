import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Quit from './Quit';
import { userEvent, within } from '@storybook/testing-library';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Quit,
} as ComponentMeta<typeof Quit>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Quit> = args => <Quit {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'ゲームをやめるボタン';

export const Clicked = Template.bind({});
Clicked.storyName = 'クリックでゲームをやめる確認モーダルを表示する';
Clicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: 'ゲームをやめる' }));
};
