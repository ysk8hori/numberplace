import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StartMenu from './StartMenu';

export default {
  component: StartMenu,
} as ComponentMeta<typeof StartMenu>;

const Template: ComponentStory<typeof StartMenu> = args => (
  <StartMenu {...args} />
);

export const Primary = Template.bind({});
