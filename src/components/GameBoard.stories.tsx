import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameBoard from './GameBoard';
import {
  blockSize_2_3 as blockSize,
  puzzle_2_3 as puzzle,
} from '../utils/test-utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/GameBoard',
  component: GameBoard,
  decorators: [
    Story => (
      <div style={{ width: '375px' } /* 375px は iphone12mini と同じサイズ */}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GameBoard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GameBoard> = args => (
  <GameBoard {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  puzzle,
  blockSize,
  selectedPos: [2, 2],
};

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
  puzzle,
  blockSize,
  selectedPos: [2, 2],
};
Large.decorators = [
  Story => (
    <div style={{ width: '900px' }}>
      <Story />
    </div>
  ),
];

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  puzzle,
  blockSize,
  selectedPos: [2, 2],
};
Small.decorators = [
  Story => (
    <div style={{ width: '150px' }}>
      <Story />
    </div>
  ),
];
