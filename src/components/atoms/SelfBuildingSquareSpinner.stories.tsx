import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import SelfBuildingSquareSpinner from './SelfBuildingSquareSpinner';

export default {
  component: SelfBuildingSquareSpinner,
} as Meta<typeof SelfBuildingSquareSpinner>;

const Template: ComponentStory<typeof SelfBuildingSquareSpinner> = _ => (
  <SelfBuildingSquareSpinner />
);

export const Primary = Template.bind({});
