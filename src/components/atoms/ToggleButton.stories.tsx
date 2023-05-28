import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ToggleButton from './ToggleButton';
import { TiPencil } from 'react-icons/ti';

export default {
  component: ToggleButton,
  argTypes: {
    onChange: {},
  },
  args: {
    children: <TiPencil style={{ width: '80%', height: '80%' }} />,
    className: 'aspect-square',
    style: { width: '100px' },
  },
} as Meta<typeof ToggleButton>;

export const Default: StoryObj<typeof ToggleButton> = {};
