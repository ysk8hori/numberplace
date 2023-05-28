import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Verifying from './Verifying';

export default {
  component: Verifying,
} as Meta<typeof Verifying>;

const Template: StoryFn<typeof Verifying> = args => <Verifying {...args} />;

export const Primary = Template.bind({});
Primary.storyName = '答え合わせボタン';
