import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import ScalingSquaresSpinner from './ScalingSquaresSpinner';

export default {
  component: ScalingSquaresSpinner,
} as Meta<typeof ScalingSquaresSpinner>;

const Template: ComponentStory<typeof ScalingSquaresSpinner> = _ => (
  <ScalingSquaresSpinner />
);

export const Primary = Template.bind({});
