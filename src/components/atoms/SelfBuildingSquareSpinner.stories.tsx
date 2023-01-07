import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelfBuildingSquareSpinner from './SelfBuildingSquareSpinner';

export default {
  component: SelfBuildingSquareSpinner,
} as ComponentMeta<typeof SelfBuildingSquareSpinner>;

const Template: ComponentStory<typeof SelfBuildingSquareSpinner> = _ => (
  <SelfBuildingSquareSpinner />
);

export const Primary = Template.bind({});
