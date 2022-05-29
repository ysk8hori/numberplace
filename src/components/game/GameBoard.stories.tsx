import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameBoard from './GameBoard';
import {
  blockSize_2_3 as blockSize,
  puzzle_2_3 as puzzle,
  puzzle_3_3,
} from '../../utils/samples';
import { MyGame } from '../../utils/typeUtils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/game/GameBoard',
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

export const HasMemo = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HasMemo.args = {
  puzzle: {
    cells: (JSON.parse(JSON.stringify(puzzle)) as MyGame).cells.map(cell => {
      cell.memoList = ['1', '2', '3', '4', '5', '6'];
      return cell;
    }),
  },
  blockSize,
  selectedPos: [2, 2],
};
HasMemo.storyName = 'メモがある場合';

export const Cross6 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Cross6.args = {
  puzzle,
  blockSize,
  selectedPos: [2, 2],
  cross: true,
  className: 'bg-white',
};
export const Cross9 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Cross9.args = {
  puzzle: puzzle_3_3,
  blockSize: { width: 3, height: 3 },
  selectedPos: [2, 2],
  cross: true,
  className: 'bg-white',
};

export const Hyper = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Hyper.args = {
  puzzle: puzzle_3_3,
  blockSize: { width: 3, height: 3 },
  selectedPos: [2, 2],
  hyper: true,
  className: 'bg-white',
};

export const HyperCross = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HyperCross.args = {
  puzzle: puzzle_3_3,
  blockSize: { width: 3, height: 3 },
  selectedPos: [2, 2],
  hyper: true,
  cross: true,
  className: 'bg-white',
};
