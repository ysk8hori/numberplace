import React from 'react';
import { StoryFn, Meta } from '@storybook/react-webpack5';
import InputPanel from './InputPanel';
import { blockSize_2_2 } from '../../../utils/samples';

export default {
  component: InputPanel,
  decorators: [
    Story => (
      <div style={{ width: '375px' } /* 375px は iphone12mini と同じサイズ */}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof InputPanel>;

const Template: StoryFn<typeof InputPanel> = args => <InputPanel {...args} />;

export const BlockSize_2x2 = Template.bind({});

BlockSize_2x2.args = {
  blockSize: blockSize_2_2,
};

export const BlockSize_3x2 = Template.bind({});

BlockSize_3x2.args = {
  blockSize: { width: 3, height: 2 },
};

export const BlockSize_3x3 = Template.bind({});

BlockSize_3x3.args = {
  blockSize: { width: 3, height: 3 },
};
