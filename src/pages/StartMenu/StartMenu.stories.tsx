import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import StartMenu from './StartMenu';

export default {
  component: StartMenu,
} as Meta<typeof StartMenu>;

const Template: ComponentStory<typeof StartMenu> = args => (
  <StartMenu {...args} />
);

export const Primary = Template.bind({});
