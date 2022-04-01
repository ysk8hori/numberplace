import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputPanelButton from './InputPanelButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/InputPanelButton',
  component: InputPanelButton,
  decorators: [
    Story => (
      <div className="w-16 bg-teal-100 p-4">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof InputPanelButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputPanelButton> = args => (
  <InputPanelButton {...args}>1</InputPanelButton>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
