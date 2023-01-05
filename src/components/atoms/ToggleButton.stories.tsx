import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

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
} as ComponentMeta<typeof ToggleButton>;

export const Default: ComponentStoryObj<typeof ToggleButton> = {};
