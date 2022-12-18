import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import ToggleButton from './ToggleButton';
import { TiPencil } from 'react-icons/ti';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
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

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStoryObj<typeof ToggleButton> = {};
