import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import backgroundimg from '../../images/11-g-90.png';

import GlassCard from './GlassCard';

export default {
  component: GlassCard,
  decorators: [
    Story => (
      <div style={{ backgroundImage: `url(${backgroundimg})` }} className="p-8">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof GlassCard>;

const Template: StoryFn<typeof GlassCard> = args => <GlassCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <h1>hello</h1>,
};
