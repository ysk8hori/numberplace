import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cell from './Cell';
import { within } from '@storybook/testing-library';
import sleep from '../../../utils/sleep';
import { blockSize_2_3 } from '../../../utils/test-utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/game/cell/Cell',
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
export const Fix = Template.bind({});
Fix.args = {
  answer: '1',
  fix: true,
};

export const Memo = Template.bind({});
Memo.args = {
  blockSize: blockSize_2_3,
  memoList: ['1', '2', '3', '4', '5', '6'],
};

export const UpleftDownright = Template.bind({});
UpleftDownright.args = {
  answer: '1',
  select: true,
  upleftDownright: true,
  uprightDownleft: false,
  hyper: false,
};
export const UprightDownleft = Template.bind({});
UprightDownleft.args = {
  answer: '1',
  select: true,
  upleftDownright: false,
  uprightDownleft: true,
  hyper: false,
};
export const Both = Template.bind({});
Both.args = {
  answer: '1',
  select: true,
  upleftDownright: true,
  uprightDownleft: true,
  hyper: false,
};
Both.storyName = 'クロスの交差点';
export const Hyper = Template.bind({});
Hyper.args = {
  answer: '1',
  select: true,
  upleftDownright: false,
  uprightDownleft: false,
  hyper: true,
};
