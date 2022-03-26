import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Verifying from './Verifying';
import { userEvent, within } from '@storybook/testing-library';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Verifying',
  component: Verifying,
} as ComponentMeta<typeof Verifying>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Verifying> = args => (
  <Verifying {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = 'こたえあわせボタン';

export const Clicked = Template.bind({});
Clicked.storyName = 'クリックでこたえあわせ確認モーダルを表示する';
Clicked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: 'こたえあわせ' }));
};
