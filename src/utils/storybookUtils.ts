import { expect } from '@storybook/jest';
import { within, userEvent, waitFor } from '@storybook/testing-library';

export async function inputAnswer(
  canvas: ReturnType<typeof within>,
  testid: string,
  answer: string,
) {
  await userEvent.click(await canvas.findByTestId(testid));
  await userEvent.click(await canvas.findByRole('button', { name: answer }));
  await waitFor(() =>
    expect(canvas.getByTestId(testid)).toHaveAttribute('data-answer', answer),
  );
}

export async function resolve_2_3(
  canvas: ReturnType<typeof within>,
  option?: { finish?: boolean },
) {
  // 1行目
  await inputAnswer(canvas, '0,0', '6');
  await inputAnswer(canvas, '2,0', '1');
  // 2行目
  await inputAnswer(canvas, '1,1', '5');
  await inputAnswer(canvas, '2,1', '3');
  await inputAnswer(canvas, '3,1', '6');
  await inputAnswer(canvas, '4,1', '2');
  // 3行目
  await inputAnswer(canvas, '1,2', '4');
  await inputAnswer(canvas, '2,2', '5');
  await inputAnswer(canvas, '4,2', '1');
  await inputAnswer(canvas, '5,2', '6');
  // 4行目
  await inputAnswer(canvas, '0,3', '2');
  await inputAnswer(canvas, '3,3', '5');
  await inputAnswer(canvas, '4,3', '4');
  await inputAnswer(canvas, '5,3', '3');
  // 5行目
  await inputAnswer(canvas, '0,4', '5');
  await inputAnswer(canvas, '1,4', '3');
  await inputAnswer(canvas, '3,4', '1');
  await inputAnswer(canvas, '4,4', '6');
  // 5行目
  await inputAnswer(canvas, '0,5', '1');
  await inputAnswer(canvas, '3,5', '3');
  if (option?.finish) {
    await inputAnswer(canvas, '5,5', '2');
  }
}
