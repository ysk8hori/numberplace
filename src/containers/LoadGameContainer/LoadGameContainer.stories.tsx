import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoadGameContainer from '.';
import { blockSize_2_2, puzzle_2_2, solved_2_2 } from '../../utils/samples';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'containers/LoadGameContainer',
  component: LoadGameContainer,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12mini',
    },
  },
} as ComponentMeta<typeof LoadGameContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoadGameContainer> = args => (
  <LoadGameContainer {...args} />
);
Template.args = {
  puzzle: puzzle_2_2,
  solved: solved_2_2,
  blockSize: blockSize_2_2,
};

export const Default = Template.bind({});
Default.args = Template.args;
