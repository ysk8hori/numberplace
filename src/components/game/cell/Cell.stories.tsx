import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cell from './Cell';
import { within } from '@storybook/testing-library';
import sleep from '../../../utils/sleep';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/game/Cell',
  component: Cell,
  decorators: [
    Story => (
      <div className="w-16">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Cell>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Cell> = args => <Cell {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  answer: '1',
};

export const LargeCell = Template.bind({});
LargeCell.decorators = [
  Story => (
    <div className="w-32">
      <Story />
    </div>
  ),
];
LargeCell.args = {
  answer: '1',
};

export const SmallCell = Template.bind({});
SmallCell.decorators = [
  Story => (
    <div className="w-6">
      <Story />
    </div>
  ),
];
SmallCell.args = {
  answer: '1',
};

export const FontSizeChangesDynamically = Template.bind({});
FontSizeChangesDynamically.decorators = [
  Story => (
    <div style={{ width: '100px' }} data-testid="div">
      <Story />
    </div>
  ),
];
FontSizeChangesDynamically.args = {
  answer: '1',
};
FontSizeChangesDynamically.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await sleep(500);
  (await canvas.findByTestId('div')).style.setProperty('width', '20px');
};
FontSizeChangesDynamically.storyName =
  'フォントサイズはセルの大きさに合わせて動的に変わる';

export const Right = Template.bind({});
Right.args = {
  answer: '1',
  right: true,
};

export const Bottom = Template.bind({});
Bottom.args = {
  answer: '1',
  bottom: true,
};

export const Select = Template.bind({});
Select.args = {
  answer: '1',
  select: true,
};
export const fix = Template.bind({});
fix.args = {
  answer: '1',
  fix: true,
};
