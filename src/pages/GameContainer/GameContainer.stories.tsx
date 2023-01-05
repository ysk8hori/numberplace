import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
  ComponentStoryObj,
} from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import GameContainer from '.';
import {
  blockSize_2_2,
  blockSize_2_3 as blockSize,
  puzzle_2_2,
  puzzle_2_3 as puzzle,
  solved_2_3,
  solved_2_2,
  blockSize_3_3,
  puzzle_3_3,
  solved_3_3,
} from '../../utils/samples';
import { inputAnswer, resolve_2_3 } from '../../utils/storybookUtils';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ReactModal from 'react-modal';
import { expect } from '@storybook/jest';
import { useSetRecoilState } from 'recoil';
import { atomOfAnswerImageVariant } from '../../atoms';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: GameContainer,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12mini',
    },
  },
  decorators: [
    Story => {
      const setIconMode = useSetRecoilState(atomOfAnswerImageVariant);
      setIconMode('num');
      return <Story />;
    },
  ],
} as ComponentMeta<typeof GameContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GameContainer> = args => (
  <GameContainer {...args} />
);
Template.args = {
  puzzle,
  solved: solved_2_3,
  blockSize,
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = Template.args;

export const IconMode = Template.bind({});
IconMode.args = Template.args;
IconMode.decorators = [
  Story => {
    const setIconMode = useSetRecoilState(atomOfAnswerImageVariant);
    setIconMode('asobi');
    return <Story />;
  },
];

export const Primary_2_2 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary_2_2.args = {
  puzzle: puzzle_2_2,
  solved: solved_2_2,
  blockSize: blockSize_2_2,
};

export const IPad = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IPad.args = Template.args;
IPad.parameters = {
  ...Template.parameters,
  viewport: { defaultViewport: 'ipad' },
};

export const Click2_3 = Template.bind({});
Click2_3.args = Template.args;
Click2_3.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('2,3'));
};
Click2_3.storyName = 'セルをクリックすると選択中となる';

export const FillableByPanel = Template.bind({});
FillableByPanel.args = Template.args;
FillableByPanel.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('2,0'));
  await userEvent.click(canvas.getByRole('button', { name: '1' }));
};
FillableByPanel.storyName = 'パネルのボタンから数字を入力できる';

export const ClearModal = Template.bind({});

ClearModal.args = Template.args;
ClearModal.play = async ({ canvasElement }) => {
  ReactModal.setAppElement(canvasElement);
  // モーダルが canvasElement の外に描画されモーダル内の要素が取れないので body を canvas にしないと動かない
  const canvas = within(canvasElement.parentElement!);
  await resolve_2_3(canvas, { finish: true });
  await expect(canvas.queryByText('クリア！')).not.toBeInTheDocument();
  await userEvent.click(canvas.getByRole('button', { name: '答え合わせ' }));
  await expect(canvas.getByText('クリア！')).toBeInTheDocument();
};
ClearModal.storyName = 'クリア時にはクリアモーダルを表示する';

export const MistakeModal: ComponentStoryObj<typeof GameContainer> = {
  args: Template.args,
  name: 'ミスが有る状態で答え合わせボタンを謳歌した場合はミステイクモーダルを表示する',
  play: async ({ canvasElement }) => {
    ReactModal.setAppElement(canvasElement);
    // モーダルが canvasElement の外に描画されモーダル内の要素が取れないので body を canvas にしないと動かない
    const canvas = within(canvasElement.parentElement!);
    await inputAnswer(canvas, '0,0', '1');
    await expect(
      canvas.queryByText('間違いがあります'),
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '答え合わせ' }));
    await expect(canvas.getByText('間違いがあります')).toBeInTheDocument();
  },
};

export const Game_3_3 = Template.bind({});
Game_3_3.args = {
  blockSize: blockSize_3_3,
  puzzle: puzzle_3_3,
  solved: solved_3_3,
};
Game_3_3.storyName = '9x9の表示確認';

export const Game_3_3_cross = Template.bind({});
Game_3_3_cross.args = {
  blockSize: blockSize_3_3,
  puzzle: puzzle_3_3,
  solved: solved_3_3,
  cross: true,
};
Game_3_3_cross.storyName = '9x9クロスの表示確認';

export const Game_3_3_hyper = Template.bind({});
Game_3_3_hyper.args = {
  blockSize: blockSize_3_3,
  puzzle: puzzle_3_3,
  solved: solved_3_3,
  hyper: true,
};
Game_3_3_hyper.storyName = '9x9HYPERの表示確認';

export const Game_3_3_hyper_cross = Template.bind({});
Game_3_3_hyper_cross.args = {
  blockSize: blockSize_3_3,
  puzzle: puzzle_3_3,
  solved: solved_3_3,
  cross: true,
  hyper: true,
};
Game_3_3_hyper_cross.storyName = '9x9HYPERxCROSSの表示確認';
