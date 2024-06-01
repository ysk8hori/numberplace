import { Meta, StoryObj } from '@storybook/react';
import { MistButton } from './MistButton.mist';

function LightDecorator({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        colorScheme: 'light',
        padding: '24px 48px',
        backgroundColor: 'white',
      }}
    >
      {children}
    </div>
  );
}
function DarkDecorator({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        colorScheme: 'dark',
        padding: '24px 48px',
        backgroundColor: 'black',
      }}
    >
      {children}
    </div>
  );
}

export default {
  component: MistButton,
  args: {
    children: 'hello',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'ボタンを無効化する',
      table: { type: { summary: 'boolean' } },
    },
  },
} satisfies Meta<typeof MistButton>;

export const Light: StoryObj<typeof MistButton> = {
  args: {},
  decorators: [
    Story => (
      <LightDecorator>
        <Story />
      </LightDecorator>
    ),
  ],
};

export const Dark: StoryObj<typeof MistButton> = {
  args: {},
  decorators: [
    Story => (
      <DarkDecorator>
        <Story />
      </DarkDecorator>
    ),
  ],
};
