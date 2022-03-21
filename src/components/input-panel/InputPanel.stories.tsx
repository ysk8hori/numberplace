import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputPanel from './InputPanel';
import { blockSize_2_2 } from '../../utils/test-utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/InputPanel',
  component: InputPanel,
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof InputPanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputPanel> = args => (
  <InputPanel {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  blockSize: blockSize_2_2,
};
