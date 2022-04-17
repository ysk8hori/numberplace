import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import backgroundimg from '../../images/11-g-90.png';

import ScalingSquaresSpinner from './ScalingSquaresSpinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/atoms/ScalingSquaresSpinner',
  component: ScalingSquaresSpinner,
} as ComponentMeta<typeof ScalingSquaresSpinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ScalingSquaresSpinner> = args => (
  <ScalingSquaresSpinner />
);

export const Primary = Template.bind({});
