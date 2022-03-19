import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GameBoard from './GameBoard';
import { BlockSize, Game } from '@ysk8hori/numberplace-generator';

const blockSize: BlockSize = { height: 2, width: 3 };
const puzzle: Game = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"2"},{"pos":[2,0]},{"pos":[3,0],"answer":"4"},{"pos":[4,0],"answer":"3"},{"pos":[5,0],"answer":"5"},{"pos":[0,1],"answer":"4"},{"pos":[1,1]},{"pos":[2,1]},{"pos":[3,1]},{"pos":[4,1]},{"pos":[5,1],"answer":"1"},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"2"},{"pos":[4,2]},{"pos":[5,2]},{"pos":[0,3]},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"6"},{"pos":[3,3]},{"pos":[4,3]},{"pos":[5,3]},{"pos":[0,4]},{"pos":[1,4]},{"pos":[2,4],"answer":"2"},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4],"answer":"4"},{"pos":[0,5]},{"pos":[1,5],"answer":"6"},{"pos":[2,5],"answer":"4"},{"pos":[3,5]},{"pos":[4,5],"answer":"5"},{"pos":[5,5]}]}',
  ),
  toString: () => ` ,2, ,4,3,5
  4, , , , ,1
  3, , ,2, , 
   ,1,6, , , 
   , ,2, , ,4
   ,6,4, ,5, ,`,
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/GameBoard',
  component: GameBoard,
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
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
};

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
  puzzle,
  blockSize,
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
};
Small.decorators = [
  Story => (
    <div style={{ width: '150px' }}>
      <Story />
    </div>
  ),
];
