import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import Generating from './Generating';

export default {
  component: Generating,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
} as Meta<typeof Generating>;

const Template: ComponentStory<typeof Generating> = args => (
  <Generating {...args} />
);
Template.args = {
  cancel: () => console.log('cancel'),
};

export const Primary = Template.bind({});
Primary.args = Template.args;
