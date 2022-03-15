import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cell from './Cell';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Cell',
  component: Cell,
} as ComponentMeta<typeof Cell>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Cell> = args => <Cell {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  answer: '1',
};
