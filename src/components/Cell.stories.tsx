import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cell from './Cell';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Cell',
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

export const Selected = Template.bind({});
Selected.args = {
  answer: '1',
  selected: true,
};
