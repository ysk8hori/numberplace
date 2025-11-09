import { Meta, StoryObj } from '@storybook/react-vite';
import MenuButton from './MenuButton';

export default {
  component: MenuButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof MenuButton>;

export const Default: StoryObj<typeof MenuButton> = {};
