import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Verifying from './Verifying';

export default {
  component: Verifying,
} as ComponentMeta<typeof Verifying>;

const Template: ComponentStory<typeof Verifying> = args => (
  <Verifying {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = '答え合わせボタン';
