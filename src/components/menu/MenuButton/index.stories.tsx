import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import MenuButton from '.';

export default {
  component: MenuButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies ComponentMeta<typeof MenuButton>;

export const Default: ComponentStoryObj<typeof MenuButton> = {};
