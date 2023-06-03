import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ToggleButton from './ToggleButton';

export default {
  component: ToggleButton,
  argTypes: {
    onChange: {},
  },
  args: {
    className: 'aspect-square',
    style: { width: '100px' },
  },
} as Meta<typeof ToggleButton>;

export const Default: StoryObj<typeof ToggleButton> = {};
