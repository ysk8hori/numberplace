import React from 'react';
import { StoryFn, Meta } from '@storybook/react-vite';

import SelfBuildingSquareSpinner from './SelfBuildingSquareSpinner';

export default {
  component: SelfBuildingSquareSpinner,
} as Meta<typeof SelfBuildingSquareSpinner>;

const Template: StoryFn<typeof SelfBuildingSquareSpinner> = _ => (
  <SelfBuildingSquareSpinner />
);

export const Primary = Template.bind({});
