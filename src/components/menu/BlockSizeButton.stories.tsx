import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BlockSizeButton from './BlockSizeButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/menu/BlockSizeButton',
  component: BlockSizeButton,
} as ComponentMeta<typeof BlockSizeButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BlockSizeButton> = args => (
  <BlockSizeButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  blockSize: { width: 2, height: 3 },
};
Primary.decorators = [
  Story => (
    <div style={{ width: '400px', height: '400px', display: 'flex' }}>
      <Story />
    </div>
  ),
];
export const IPhone13 = Template.bind({});
IPhone13.args = {
  blockSize: { width: 3, height: 3 },
};
IPhone13.decorators = [
  Story => (
    <div style={{ width: '280px', height: '280px', display: 'flex' }}>
      <Story />
    </div>
  ),
];

export const Cross = Template.bind({});
Cross.args = {
  blockSize: { width: 3, height: 3 },
  cross: true,
};
Cross.decorators = [
  Story => (
    <div style={{ width: '280px', height: '280px', display: 'flex' }}>
      <Story />
    </div>
  ),
];

export const Hyper = Template.bind({});
Hyper.args = {
  blockSize: { width: 3, height: 3 },
  hyper: true,
};
Hyper.decorators = [
  Story => (
    <div style={{ width: '280px', height: '280px', display: 'flex' }}>
      <Story />
    </div>
  ),
];

export const HyperCross = Template.bind({});
HyperCross.args = {
  blockSize: { width: 3, height: 3 },
  cross: true,
  hyper: true,
};
HyperCross.decorators = [
  Story => (
    <div style={{ width: '280px', height: '280px', display: 'flex' }}>
      <Story />
    </div>
  ),
];
