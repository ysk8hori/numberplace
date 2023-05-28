import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import GameBoard from './GameBoard';
import {
  blockSize_2_3 as blockSize,
  puzzle_2_3 as puzzle,
  puzzle_3_3,
} from '../../utils/samples';
import { MyGame } from '../../utils/typeUtils';

export default {
  component: GameBoard,
  decorators: [
    Story => (
      <div style={{ width: '375px' } /* 375px は iphone12mini と同じサイズ */}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof GameBoard>;

const Template: StoryFn<typeof GameBoard> = args => <GameBoard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  puzzle,
  blockSize,
  selectedPos: [2, 2],
};

export const Large = Template.bind({});

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

Cross6.args = {
  puzzle,
  blockSize,
  selectedPos: [2, 2],
  cross: true,
  className: 'bg-white',
};
export const Cross9 = Template.bind({});

Cross9.args = {
  puzzle: puzzle_3_3,
  blockSize: { width: 3, height: 3 },
  selectedPos: [2, 2],
  cross: true,
  className: 'bg-white',
};

export const Hyper = Template.bind({});

Hyper.args = {
  puzzle: puzzle_3_3,
  blockSize: { width: 3, height: 3 },
  selectedPos: [2, 2],
  hyper: true,
  className: 'bg-white',
};

export const HyperCross = Template.bind({});

HyperCross.args = {
  puzzle: puzzle_3_3,
  blockSize: { width: 3, height: 3 },
  selectedPos: [2, 2],
  hyper: true,
  cross: true,
  className: 'bg-white',
};
