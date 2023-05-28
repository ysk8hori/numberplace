import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import DifficultySelector from './DifficultySelector';

export default {
  component: DifficultySelector,
} as Meta<typeof DifficultySelector>;

const Template: StoryFn<typeof DifficultySelector> = args => (
  <DifficultySelector {...args} />
);
Template.args = {
  blockSize: { width: 3, height: 3 },
  difficulty: 'normal',
};

export const Primary = Template.bind({});
Primary.args = Template.args;
