import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameContainer from './GameContainer';
import {
  blockSize_2_3 as blockSize,
  puzzle_2_3 as puzzle,
} from '../utils/test-utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/GameContainer',
  component: GameContainer,
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GameContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GameContainer> = args => (
  <GameContainer {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  puzzle,
  blockSize,
};
