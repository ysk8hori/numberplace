import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import GameContainer from './GameContainer';
import {
  blockSize_2_3 as blockSize,
  puzzle_2_3 as puzzle,
} from '../utils/test-utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/GameContainer',
  component: GameContainer,
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GameContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GameContainer> = args => (
  <GameContainer {...args} />
);
Template.args = {
  puzzle,
  blockSize,
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = Template.args;

export const Click2_3 = Template.bind({});
Click2_3.args = Template.args;
Click2_3.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('2,3'));
};
Click2_3.storyName = 'セルをクリックすると選択中となる';

export const FillableByKeyboard = Template.bind({});
FillableByKeyboard.args = Template.args;
FillableByKeyboard.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('2,0'));
  await userEvent.keyboard('1');
};
FillableByKeyboard.storyName = 'キーボードから数字を入力できる';
