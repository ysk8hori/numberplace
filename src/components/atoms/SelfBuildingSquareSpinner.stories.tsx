import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelfBuildingSquareSpinner from './SelfBuildingSquareSpinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: SelfBuildingSquareSpinner,
} as ComponentMeta<typeof SelfBuildingSquareSpinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelfBuildingSquareSpinner> = args => (
  <SelfBuildingSquareSpinner />
);

export const Primary = Template.bind({});
