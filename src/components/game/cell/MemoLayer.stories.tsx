import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MemoLayer from './MemoLayer';
import {
  blockSize_2_2,
  blockSize_2_3,
  blockSize_3_3,
} from '../../../utils/samples';

export default {
  component: MemoLayer,
} as ComponentMeta<typeof MemoLayer>;

const Template: ComponentStory<typeof MemoLayer> = args => (
  <MemoLayer {...args} />
);
Template.args = {
  blockSize: blockSize_3_3,
  memoList: ['1', '2', '4', '9'],
};

export const Default = Template.bind({});
Default.args = Template.args;
Default.decorators = [
  Story => (
    <div className="aspect-square border" style={{ width: '80px' }}>
      <Story />
    </div>
  ),
];

export const SmallCell = Template.bind({});
SmallCell.args = Template.args;
SmallCell.decorators = [
  Story => (
    <div className="aspect-square border" style={{ width: '40px' }}>
      <Story />
    </div>
  ),
];
SmallCell.storyName = 'セルの大きさに合わせたフォントサイズとなる';

export const Block2_2 = Template.bind({});
Block2_2.args = {
  blockSize: blockSize_2_2,
  memoList: ['1', '2', '3', '4'],
};
Block2_2.decorators = [
  Story => (
    <div className="aspect-square border" style={{ width: '80px' }}>
      <Story />
    </div>
  ),
];
Block2_2.storyName = '4x4 のパズルの場合';

export const Block2_3 = Template.bind({});
Block2_3.args = {
  blockSize: blockSize_2_3,
  memoList: ['1', '2', '3', '4', '5', '6'],
};
Block2_3.decorators = [
  Story => (
    <div className="aspect-square border" style={{ width: '80px' }}>
      <Story />
    </div>
  ),
];
Block2_3.storyName = '6x6 のパズルの場合';
