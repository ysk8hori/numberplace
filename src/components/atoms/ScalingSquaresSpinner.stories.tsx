import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScalingSquaresSpinner from './ScalingSquaresSpinner';

export default {
  component: ScalingSquaresSpinner,
} as ComponentMeta<typeof ScalingSquaresSpinner>;

const Template: ComponentStory<typeof ScalingSquaresSpinner> = _ => (
  <ScalingSquaresSpinner />
);

export const Primary = Template.bind({});
