import React from 'react';
import { StoryFn, Meta } from '@storybook/react-vite';

import ScalingSquaresSpinner from './ScalingSquaresSpinner';

export default {
  component: ScalingSquaresSpinner,
} as Meta<typeof ScalingSquaresSpinner>;

const Template: StoryFn<typeof ScalingSquaresSpinner> = _ => (
  <ScalingSquaresSpinner />
);

export const Primary = Template.bind({});
