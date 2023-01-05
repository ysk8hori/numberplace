import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Generating from './Generating';

export default {
  component: Generating,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
} as ComponentMeta<typeof Generating>;

const Template: ComponentStory<typeof Generating> = args => (
  <Generating {...args} />
);
Template.args = {
  cancel: () => console.log('cancel'),
};

export const Primary = Template.bind({});
Primary.args = Template.args;
