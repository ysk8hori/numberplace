import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScalingSquaresSpinner from './ScalingSquaresSpinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: ScalingSquaresSpinner,
} as ComponentMeta<typeof ScalingSquaresSpinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ScalingSquaresSpinner> = _ => (
  <ScalingSquaresSpinner />
);

export const Primary = Template.bind({});
