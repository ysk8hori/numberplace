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

export const blockSize_2_2: BlockSize = { height: 2, width: 2 };
export const puzzle_2_2: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"4"},{"pos":[2,0]},{"pos":[3,0],"answer":"2"},{"pos":[0,1],"answer":"2"},{"pos":[1,1]},{"pos":[2,1],"answer":"4"},{"pos":[3,1]},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"4"},{"pos":[0,3]},{"pos":[1,3]},{"pos":[2,3],"answer":"2"},{"pos":[3,3]}]}',
  ),
};
export const corrected_2_2: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"1"},{"pos":[1,0],"answer":"4","isFix":true},{"pos":[2,0],"answer":"3"},{"pos":[3,0],"answer":"2","isFix":true},{"pos":[0,1],"answer":"2","isFix":true},{"pos":[1,1],"answer":"3"},{"pos":[2,1],"answer":"4","isFix":true},{"pos":[3,1],"answer":"1"},{"pos":[0,2],"answer":"3","isFix":true},{"pos":[1,2],"answer":"2"},{"pos":[2,2],"answer":"1"},{"pos":[3,2],"answer":"4","isFix":true},{"pos":[0,3],"answer":"4"},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"2","isFix":true},{"pos":[3,3],"answer":"3"}]}',
  ),
};

export const blockSize_2_3: BlockSize = {
  height: 2,
  width: 3,
};
export const puzzle_2_3: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"2"},{"pos":[2,0]},{"pos":[3,0],"answer":"4"},{"pos":[4,0],"answer":"3"},{"pos":[5,0],"answer":"5"},{"pos":[0,1],"answer":"4"},{"pos":[1,1]},{"pos":[2,1]},{"pos":[3,1]},{"pos":[4,1]},{"pos":[5,1],"answer":"1"},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"2"},{"pos":[4,2]},{"pos":[5,2]},{"pos":[0,3]},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"6"},{"pos":[3,3]},{"pos":[4,3]},{"pos":[5,3]},{"pos":[0,4]},{"pos":[1,4]},{"pos":[2,4],"answer":"2"},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4],"answer":"4"},{"pos":[0,5]},{"pos":[1,5],"answer":"6"},{"pos":[2,5],"answer":"4"},{"pos":[3,5]},{"pos":[4,5],"answer":"5"},{"pos":[5,5]}]}',
  ),
};
export const corrected_2_3: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"6"},{"pos":[1,0],"answer":"2","isFix":true},{"pos":[2,0],"answer":"1"},{"pos":[3,0],"answer":"4","isFix":true},{"pos":[4,0],"answer":"3","isFix":true},{"pos":[5,0],"answer":"5","isFix":true},{"pos":[0,1],"answer":"4","isFix":true},{"pos":[1,1],"answer":"5"},{"pos":[2,1],"answer":"3"},{"pos":[3,1],"answer":"6"},{"pos":[4,1],"answer":"2"},{"pos":[5,1],"answer":"1","isFix":true},{"pos":[0,2],"answer":"3","isFix":true},{"pos":[1,2],"answer":"4"},{"pos":[2,2],"answer":"5"},{"pos":[3,2],"answer":"2","isFix":true},{"pos":[4,2],"answer":"1"},{"pos":[5,2],"answer":"6"},{"pos":[0,3],"answer":"2"},{"pos":[1,3],"answer":"1","isFix":true},{"pos":[2,3],"answer":"6","isFix":true},{"pos":[3,3],"answer":"5"},{"pos":[4,3],"answer":"4"},{"pos":[5,3],"answer":"3"},{"pos":[0,4],"answer":"5"},{"pos":[1,4],"answer":"3"},{"pos":[2,4],"answer":"2","isFix":true},{"pos":[3,4],"answer":"1"},{"pos":[4,4],"answer":"6"},{"pos":[5,4],"answer":"4","isFix":true},{"pos":[0,5],"answer":"1"},{"pos":[1,5],"answer":"6","isFix":true},{"pos":[2,5],"answer":"4","isFix":true},{"pos":[3,5],"answer":"3"},{"pos":[4,5],"answer":"5","isFix":true},{"pos":[5,5],"answer":"2"}]}',
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
