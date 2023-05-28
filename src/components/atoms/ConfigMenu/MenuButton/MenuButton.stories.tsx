import { Meta, ComponentStoryObj } from '@storybook/react';
import MenuButton from './MenuButton';

export default {
  component: MenuButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof MenuButton>;

export const Default: ComponentStoryObj<typeof MenuButton> = {};
