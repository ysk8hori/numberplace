import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Generating from './Generating';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/other/Generating',
  component: Generating,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
} as ComponentMeta<typeof Generating>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Generating> = args => (
  <Generating {...args} />
);
Template.args = {
  cancel: () => console.log('cancel'),
};

export const Primary = Template.bind({});
Primary.args = Template.args;
