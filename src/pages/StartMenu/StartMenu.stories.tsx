import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StartMenu from './StartMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: StartMenu,
} as ComponentMeta<typeof StartMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StartMenu> = args => (
  <StartMenu {...args} />
);

export const Primary = Template.bind({});
