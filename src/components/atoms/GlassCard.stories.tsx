import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import backgroundimg from '../../images/11-g-90.png';

import GlassCard from './GlassCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/atoms/GlassCard',
  component: GlassCard,
  decorators: [
    Story => (
      <div style={{ backgroundImage: `url(${backgroundimg})` }} className="p-8">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GlassCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GlassCard> = args => (
  <GlassCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: <h1>hello</h1>,
};
