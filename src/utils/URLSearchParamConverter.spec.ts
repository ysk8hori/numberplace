import { describe, expect, test } from 'vitest';
import { puzzle_4_4 } from './test-utils';
import { puzzleToString } from './URLSearchParamConverter';

export const puzzle_2_3 = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"2"},{"pos":[2,0]},{"pos":[3,0],"answer":"4"},{"pos":[4,0],"answer":"3"},{"pos":[5,0],"answer":"5"},{"pos":[0,1],"answer":"4"},{"pos":[1,1]},{"pos":[2,1]},{"pos":[3,1]},{"pos":[4,1]},{"pos":[5,1],"answer":"1"},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"2"},{"pos":[4,2]},{"pos":[5,2]},{"pos":[0,3]},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"6"},{"pos":[3,3]},{"pos":[4,3]},{"pos":[5,3]},{"pos":[0,4]},{"pos":[1,4]},{"pos":[2,4],"answer":"2"},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4],"answer":"4"},{"pos":[0,5]},{"pos":[1,5],"answer":"6"},{"pos":[2,5],"answer":"4"},{"pos":[3,5]},{"pos":[4,5],"answer":"5"},{"pos":[5,5]}]}',
  ),
};

describe('puzzleToString', () => {
  test('puzzle_2_3', () => {
    expect(puzzleToString({ puzzle: puzzle_2_3 })).toEqual(
      ' 2 435|4    1|3  2| 16|  2  4| 64 5',
    );
  });
  test('puzzle_2_3 comma', () => {
    expect(
      puzzleToString({
        puzzle: puzzle_2_3,
        colSplitter: ',',
        rowSplitter: '\n',
        empty: '',
      }),
    ).toEqual(',2,,4,3,5\n4,,,,,1\n3,,,2\n,1,6\n,,2,,,4\n,6,4,,5');
  });
  test('puzzle_2_3 urlencode', () => {
    expect(
      encodeURI(
        puzzleToString({
          puzzle: puzzle_2_3,
          colSplitter: ',',
          rowSplitter: '|',
          empty: '',
        }),
      ),
    ).toEqual(',2,,4,3,5%7C4,,,,,1%7C3,,,2%7C,1,6%7C,,2,,,4%7C,6,4,,5');
  });
  test('puzzle_4_4 urlencode', () => {
    expect(
      encodeURI(
        puzzleToString({
          puzzle: puzzle_4_4,
          colSplitter: '',
          rowSplitter: 'n',
          empty: 'x',
        }),
      ),
    ).toEqual(
      '70dxexxxxxx452nx8xcx972xxdxxx3nxxxxxxxxx5n9xx6xx3xxxxxx1bn2xxxxxxxxxx5xxxanxx173xx8xx6x9enxxx3xefxxa0xx8x4nxxa87xx9x1nfxxx5xxxxx8xxx4nxxx2dxxxxxxx89xenbaxxx2xxxx5x3xf6n3c8xxx4xbx7xxxd1nxxxxxx2cxxxxx0xdnxxxxxxxax3xx1cnxxbxxxx4xxexxxx2n1d298xx6acf',
    );
  });
});
