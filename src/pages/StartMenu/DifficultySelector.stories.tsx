import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DifficultySelector from './DifficultySelector';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: DifficultySelector,
} as ComponentMeta<typeof DifficultySelector>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DifficultySelector> = args => (
  <DifficultySelector {...args} />
);
Template.args = {
  blockSize: { width: 3, height: 3 },
  difficulty: 'normal',
};

export const Primary = Template.bind({});
Primary.args = Template.args;
