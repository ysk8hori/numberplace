import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import backgroundimg from '../../images/11-g-90.png';

import GlassCardButton from './GlassCardButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/atoms/GlassCardButton',
  component: GlassCardButton,
  decorators: [
    Story => (
      <div style={{ backgroundImage: `url(${backgroundimg})` }} className="p-8">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GlassCardButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GlassCardButton> = args => (
  <GlassCardButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: <h1>hello</h1>,
};
