import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputPanelButton from './InputPanelButton';
import { blockSize_2_2 } from '../../utils/test-utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/InputPanelButton',
  component: InputPanelButton,
  decorators: [
    Story => (
      <div className="w-16">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof InputPanelButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputPanelButton> = args => (
  <InputPanelButton {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  answerString: '1',
};
