import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BlockSizeButton from './BlockSizeButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/menu/BlockSizeButton',
  component: BlockSizeButton,
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '400px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof BlockSizeButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BlockSizeButton> = args => (
  <BlockSizeButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  blockSize: { width: 2, height: 3 },
};
