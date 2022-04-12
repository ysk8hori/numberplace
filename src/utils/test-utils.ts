import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };

import { BlockSize } from '@ysk8hori/numberplace-generator';
import { MyGame } from './typeUtils';
import { markFixed } from './utils';

export const blockSize_2_2: BlockSize = { height: 2, width: 2 };
export const puzzle_2_2: MyGame = markFixed({
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"4"},{"pos":[2,0]},{"pos":[3,0],"answer":"2"},{"pos":[0,1],"answer":"2"},{"pos":[1,1]},{"pos":[2,1],"answer":"4"},{"pos":[3,1]},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"4"},{"pos":[0,3]},{"pos":[1,3]},{"pos":[2,3],"answer":"2"},{"pos":[3,3]}]}',
  ),
});
export const corrected_2_2: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"1"},{"pos":[1,0],"answer":"4","isFix":true},{"pos":[2,0],"answer":"3"},{"pos":[3,0],"answer":"2","isFix":true},{"pos":[0,1],"answer":"2","isFix":true},{"pos":[1,1],"answer":"3"},{"pos":[2,1],"answer":"4","isFix":true},{"pos":[3,1],"answer":"1"},{"pos":[0,2],"answer":"3","isFix":true},{"pos":[1,2],"answer":"2"},{"pos":[2,2],"answer":"1"},{"pos":[3,2],"answer":"4","isFix":true},{"pos":[0,3],"answer":"4"},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"2","isFix":true},{"pos":[3,3],"answer":"3"}]}',
  ),
};

export const blockSize_2_3: BlockSize = {
  height: 2,
  width: 3,
};
export const puzzle_2_3: MyGame = markFixed({
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"2"},{"pos":[2,0]},{"pos":[3,0],"answer":"4"},{"pos":[4,0],"answer":"3"},{"pos":[5,0],"answer":"5"},{"pos":[0,1],"answer":"4"},{"pos":[1,1]},{"pos":[2,1]},{"pos":[3,1]},{"pos":[4,1]},{"pos":[5,1],"answer":"1"},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"2"},{"pos":[4,2]},{"pos":[5,2]},{"pos":[0,3]},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"6"},{"pos":[3,3]},{"pos":[4,3]},{"pos":[5,3]},{"pos":[0,4]},{"pos":[1,4]},{"pos":[2,4],"answer":"2"},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4],"answer":"4"},{"pos":[0,5]},{"pos":[1,5],"answer":"6"},{"pos":[2,5],"answer":"4"},{"pos":[3,5]},{"pos":[4,5],"answer":"5"},{"pos":[5,5]}]}',
  ),
});
export const corrected_2_3: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"6"},{"pos":[1,0],"answer":"2","isFix":true},{"pos":[2,0],"answer":"1"},{"pos":[3,0],"answer":"4","isFix":true},{"pos":[4,0],"answer":"3","isFix":true},{"pos":[5,0],"answer":"5","isFix":true},{"pos":[0,1],"answer":"4","isFix":true},{"pos":[1,1],"answer":"5"},{"pos":[2,1],"answer":"3"},{"pos":[3,1],"answer":"6"},{"pos":[4,1],"answer":"2"},{"pos":[5,1],"answer":"1","isFix":true},{"pos":[0,2],"answer":"3","isFix":true},{"pos":[1,2],"answer":"4"},{"pos":[2,2],"answer":"5"},{"pos":[3,2],"answer":"2","isFix":true},{"pos":[4,2],"answer":"1"},{"pos":[5,2],"answer":"6"},{"pos":[0,3],"answer":"2"},{"pos":[1,3],"answer":"1","isFix":true},{"pos":[2,3],"answer":"6","isFix":true},{"pos":[3,3],"answer":"5"},{"pos":[4,3],"answer":"4"},{"pos":[5,3],"answer":"3"},{"pos":[0,4],"answer":"5"},{"pos":[1,4],"answer":"3"},{"pos":[2,4],"answer":"2","isFix":true},{"pos":[3,4],"answer":"1"},{"pos":[4,4],"answer":"6"},{"pos":[5,4],"answer":"4","isFix":true},{"pos":[0,5],"answer":"1"},{"pos":[1,5],"answer":"6","isFix":true},{"pos":[2,5],"answer":"4","isFix":true},{"pos":[3,5],"answer":"3"},{"pos":[4,5],"answer":"5","isFix":true},{"pos":[5,5],"answer":"2"}]}',
  ),
};

export const blockSize_3_3: BlockSize = { height: 3, width: 3 };
/**
 * 9x9の問題
 *
 * こだわりのポイント
 *
 * - 1つも答えが記入されていない番号がある
 * - 1つだけ答えが記入されている番号がある
 */
export const puzzle_3_3: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"9","isFix":true},{"pos":[2,0],"answer":"7","isFix":true},{"pos":[3,0],"answer":"2","isFix":true},{"pos":[4,0]},{"pos":[5,0]},{"pos":[6,0]},{"pos":[7,0],"answer":"6","isFix":true},{"pos":[8,0]},{"pos":[0,1],"answer":"6","isFix":true},{"pos":[1,1]},{"pos":[2,1]},{"pos":[3,1]},{"pos":[4,1],"answer":"4","isFix":true},{"pos":[5,1],"answer":"8","isFix":true},{"pos":[6,1]},{"pos":[7,1]},{"pos":[8,1]},{"pos":[0,2]},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2]},{"pos":[4,2],"answer":"7","isFix":true},{"pos":[5,2],"answer":"3","isFix":true},{"pos":[6,2]},{"pos":[7,2]},{"pos":[8,2]},{"pos":[0,3]},{"pos":[1,3]},{"pos":[2,3],"answer":"9","isFix":true},{"pos":[3,3],"answer":"4","isFix":true},{"pos":[4,3]},{"pos":[5,3]},{"pos":[6,3]},{"pos":[7,3]},{"pos":[8,3]},{"pos":[0,4]},{"pos":[1,4]},{"pos":[2,4]},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4]},{"pos":[6,4],"answer":"3","isFix":true},{"pos":[7,4],"answer":"2","isFix":true},{"pos":[8,4]},{"pos":[0,5]},{"pos":[1,5]},{"pos":[2,5],"answer":"3","isFix":true},{"pos":[3,5]},{"pos":[4,5]},{"pos":[5,5],"answer":"7","isFix":true},{"pos":[6,5]},{"pos":[7,5]},{"pos":[8,5],"answer":"6","isFix":true},{"pos":[0,6]},{"pos":[1,6],"answer":"4","isFix":true},{"pos":[2,6]},{"pos":[3,6]},{"pos":[4,6]},{"pos":[5,6],"answer":"6","isFix":true},{"pos":[6,6],"answer":"1","isFix":true},{"pos":[7,6],"answer":"9","isFix":true},{"pos":[8,6]},{"pos":[0,7]},{"pos":[1,7]},{"pos":[2,7]},{"pos":[3,7]},{"pos":[4,7]},{"pos":[5,7]},{"pos":[6,7],"answer":"4","isFix":true},{"pos":[7,7]},{"pos":[8,7],"answer":"7","isFix":true},{"pos":[0,8]},{"pos":[1,8]},{"pos":[2,8]},{"pos":[3,8],"answer":"3","isFix":true},{"pos":[4,8],"answer":"2","isFix":true},{"pos":[5,8]},{"pos":[6,8]},{"pos":[7,8]},{"pos":[8,8]}]}',
  ),
};
export const corrected_3_3: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"4"},{"pos":[1,0],"answer":"9"},{"pos":[2,0],"answer":"7"},{"pos":[3,0],"answer":"2"},{"pos":[4,0],"answer":"1"},{"pos":[5,0],"answer":"5"},{"pos":[6,0],"answer":"8"},{"pos":[7,0],"answer":"6"},{"pos":[8,0],"answer":"3"},{"pos":[0,1],"answer":"6"},{"pos":[1,1],"answer":"3"},{"pos":[2,1],"answer":"5"},{"pos":[3,1],"answer":"9"},{"pos":[4,1],"answer":"4"},{"pos":[5,1],"answer":"8"},{"pos":[6,1],"answer":"2"},{"pos":[7,1],"answer":"7"},{"pos":[8,1],"answer":"1"},{"pos":[0,2],"answer":"8"},{"pos":[1,2],"answer":"1"},{"pos":[2,2],"answer":"2"},{"pos":[3,2],"answer":"6"},{"pos":[4,2],"answer":"7"},{"pos":[5,2],"answer":"3"},{"pos":[6,2],"answer":"9"},{"pos":[7,2],"answer":"5"},{"pos":[8,2],"answer":"4"},{"pos":[0,3],"answer":"5"},{"pos":[1,3],"answer":"6"},{"pos":[2,3],"answer":"9"},{"pos":[3,3],"answer":"4"},{"pos":[4,3],"answer":"3"},{"pos":[5,3],"answer":"2"},{"pos":[6,3],"answer":"7"},{"pos":[7,3],"answer":"1"},{"pos":[8,3],"answer":"8"},{"pos":[0,4],"answer":"7"},{"pos":[1,4],"answer":"8"},{"pos":[2,4],"answer":"4"},{"pos":[3,4],"answer":"5"},{"pos":[4,4],"answer":"6"},{"pos":[5,4],"answer":"1"},{"pos":[6,4],"answer":"3"},{"pos":[7,4],"answer":"2"},{"pos":[8,4],"answer":"9"},{"pos":[0,5],"answer":"1"},{"pos":[1,5],"answer":"2"},{"pos":[2,5],"answer":"3"},{"pos":[3,5],"answer":"8"},{"pos":[4,5],"answer":"9"},{"pos":[5,5],"answer":"7"},{"pos":[6,5],"answer":"5"},{"pos":[7,5],"answer":"4"},{"pos":[8,5],"answer":"6"},{"pos":[0,6],"answer":"3"},{"pos":[1,6],"answer":"4"},{"pos":[2,6],"answer":"8"},{"pos":[3,6],"answer":"7"},{"pos":[4,6],"answer":"5"},{"pos":[5,6],"answer":"6"},{"pos":[6,6],"answer":"1"},{"pos":[7,6],"answer":"9"},{"pos":[8,6],"answer":"2"},{"pos":[0,7],"answer":"2"},{"pos":[1,7],"answer":"5"},{"pos":[2,7],"answer":"6"},{"pos":[3,7],"answer":"1"},{"pos":[4,7],"answer":"8"},{"pos":[5,7],"answer":"9"},{"pos":[6,7],"answer":"4"},{"pos":[7,7],"answer":"3"},{"pos":[8,7],"answer":"7"},{"pos":[0,8],"answer":"9"},{"pos":[1,8],"answer":"7"},{"pos":[2,8],"answer":"1"},{"pos":[3,8],"answer":"3"},{"pos":[4,8],"answer":"2"},{"pos":[5,8],"answer":"4"},{"pos":[6,8],"answer":"6"},{"pos":[7,8],"answer":"8"},{"pos":[8,8],"answer":"5"}]}',
  ),
};

export function resolve_2_3(option?: { finish?: boolean }) {
  // 1行目
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.keyboard('6');
  userEvent.click(screen.getByTestId('2,0'));
  userEvent.keyboard('1');
  // 2行目
  userEvent.click(screen.getByTestId('1,1'));
  userEvent.keyboard('5');
  userEvent.click(screen.getByTestId('2,1'));
  userEvent.keyboard('3');
  userEvent.click(screen.getByTestId('3,1'));
  userEvent.keyboard('6');
  userEvent.click(screen.getByTestId('4,1'));
  userEvent.keyboard('2');
  // 3行目
  userEvent.click(screen.getByTestId('1,2'));
  userEvent.keyboard('4');
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.keyboard('5');
  userEvent.click(screen.getByTestId('4,2'));
  userEvent.keyboard('1');
  userEvent.click(screen.getByTestId('5,2'));
  userEvent.keyboard('6');
  // 4行目
  userEvent.click(screen.getByTestId('0,3'));
  userEvent.keyboard('2');
  userEvent.click(screen.getByTestId('3,3'));
  userEvent.keyboard('5');
  userEvent.click(screen.getByTestId('4,3'));
  userEvent.keyboard('4');
  userEvent.click(screen.getByTestId('5,3'));
  userEvent.keyboard('3');
  // 5行目
  userEvent.click(screen.getByTestId('0,4'));
  userEvent.keyboard('5');
  userEvent.click(screen.getByTestId('1,4'));
  userEvent.keyboard('3');
  userEvent.click(screen.getByTestId('3,4'));
  userEvent.keyboard('1');
  userEvent.click(screen.getByTestId('4,4'));
  userEvent.keyboard('6');
  // 5行目
  userEvent.click(screen.getByTestId('0,5'));
  userEvent.keyboard('1');
  userEvent.click(screen.getByTestId('3,5'));
  userEvent.keyboard('3');
  const finish = () => {
    userEvent.click(screen.getByTestId('5,5'));
    userEvent.keyboard('2');
  };
  return option?.finish ? finish() : finish;
}
