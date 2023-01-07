import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import backgroundimg from '../../images/11-g-90.png';

import GlassCardButton from './GlassCardButton';

export default {
  component: GlassCardButton,
  decorators: [
    Story => (
      <div style={{ backgroundImage: `url(${backgroundimg})` }} className="p-8">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GlassCardButton>;

const Template: ComponentStory<typeof GlassCardButton> = args => (
  <GlassCardButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: <h1>hello</h1>,
};
