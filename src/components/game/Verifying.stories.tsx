import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Verifying from './Verifying';
import { userEvent, within } from '@storybook/testing-library';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Verifying,
} as ComponentMeta<typeof Verifying>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Verifying> = args => (
  <Verifying {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = '答え合わせボタン';
