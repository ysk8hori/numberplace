import React from 'react';
import { StoryFn, Meta } from '@storybook/react-vite';
import StartMenu from './StartMenu';

export default {
  component: StartMenu,
} as Meta<typeof StartMenu>;

const Template: StoryFn<typeof StartMenu> = args => <StartMenu {...args} />;

export const Primary = Template.bind({});
