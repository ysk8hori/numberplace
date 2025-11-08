import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import ToggleMemoButton from './ToggleMemoButton';
import { userEvent, within } from 'storybook/test';

export default {
  component: ToggleMemoButton,
  decorators: [
    Story => (
      <div className="w-20 h-20">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ToggleMemoButton>;

export const Default: StoryObj<typeof ToggleMemoButton> = {};
export const Checked: StoryObj<typeof ToggleMemoButton> = {
  name: 'クリックするとチェックが入る',
  play: async ({ canvasElement }) => {
    // Starts querying the component from its root element
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('checkbox'));
  },
};
