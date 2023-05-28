import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import Quit from './Quit';
import { userEvent, within } from '@storybook/testing-library';

export default {
  component: Quit,
} as Meta<typeof Quit>;

const Template: ComponentStory<typeof Quit> = args => <Quit {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'ゲームをやめるボタン';

export const Clicked = Template.bind({});
Clicked.storyName = 'クリックでゲームをやめる確認モーダルを表示する';
Clicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: 'ゲームをやめる' }));
};
