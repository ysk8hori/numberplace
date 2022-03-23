import { within, userEvent } from '@storybook/testing-library';

export async function resolve_2_3(
  canvas: ReturnType<typeof within>,
  option?: { finish?: boolean },
) {
  // 1行目
  await userEvent.click(canvas.getByTestId('0,0'));
  await userEvent.keyboard('6');
  await userEvent.click(canvas.getByTestId('2,0'));
  await userEvent.keyboard('1');
  // 2行目
  await userEvent.click(canvas.getByTestId('1,1'));
  await userEvent.keyboard('5');
  await userEvent.click(canvas.getByTestId('2,1'));
  await userEvent.keyboard('3');
  await userEvent.click(canvas.getByTestId('3,1'));
  await userEvent.keyboard('6');
  await userEvent.click(canvas.getByTestId('4,1'));
  await userEvent.keyboard('2');
  // 3行目
  await userEvent.click(canvas.getByTestId('1,2'));
  await userEvent.keyboard('4');
  await userEvent.click(canvas.getByTestId('2,2'));
  await userEvent.keyboard('5');
  await userEvent.click(canvas.getByTestId('4,2'));
  await userEvent.keyboard('1');
  await userEvent.click(canvas.getByTestId('5,2'));
  await userEvent.keyboard('6');
  // 4行目
  await userEvent.click(canvas.getByTestId('0,3'));
  await userEvent.keyboard('2');
  await userEvent.click(canvas.getByTestId('3,3'));
  await userEvent.keyboard('5');
  await userEvent.click(canvas.getByTestId('4,3'));
  await userEvent.keyboard('4');
  await userEvent.click(canvas.getByTestId('5,3'));
  await userEvent.keyboard('3');
  // 5行目
  await userEvent.click(canvas.getByTestId('0,4'));
  await userEvent.keyboard('5');
  await userEvent.click(canvas.getByTestId('1,4'));
  await userEvent.keyboard('3');
  await userEvent.click(canvas.getByTestId('3,4'));
  await userEvent.keyboard('1');
  await userEvent.click(canvas.getByTestId('4,4'));
  await userEvent.keyboard('6');
  // 5行目
  await userEvent.click(canvas.getByTestId('0,5'));
  await userEvent.keyboard('1');
  await userEvent.click(canvas.getByTestId('3,5'));
  await userEvent.keyboard('3');
  if (option?.finish) {
    await userEvent.click(canvas.getByTestId('5,5'));
    await userEvent.keyboard('2');
  }
}
