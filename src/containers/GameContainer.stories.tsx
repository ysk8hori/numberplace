import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import GameContainer from './GameContainer';
import {
  blockSize_2_2,
  blockSize_2_3 as blockSize,
  puzzle_2_2,
  puzzle_2_3 as puzzle,
  corrected_2_3,
} from '../utils/test-utils';
import { resolve_2_3 } from '../utils/storybookUtils';
import {
  createFontFamilyValue,
  FontFamilyContext,
} from '../contexts/fontContext';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'containers/GameContainer',
  component: GameContainer,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12mini',
    },
  },
} as ComponentMeta<typeof GameContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GameContainer> = args => (
  <GameContainer {...args} />
);
Template.args = {
  puzzle,
  corrected: corrected_2_3,
  blockSize,
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = Template.args;

export const Primary_2_2 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary_2_2.args = {
  puzzle: puzzle_2_2,
  corrected: corrected_2_3,
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

export const FillableByKeyboard = Template.bind({});
FillableByKeyboard.args = Template.args;
FillableByKeyboard.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
FillableByKeyboard.storyName = 'キーボードから数字を入力できる';

export const FillableByPanel = Template.bind({});
FillableByPanel.args = Template.args;
FillableByPanel.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('2,0'));
  await userEvent.click(canvas.getByRole('button', { name: '1' }));
};
FillableByPanel.storyName = 'パネルのボタンから数字を入力できる';

export const Resolved = Template.bind({});
Resolved.args = Template.args;
Resolved.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: 'こたえあわせ' }));
};
Resolved.storyName =
  '「こたえあわせ」ボタンを押下したら答え合わせするかどうかの確認ダイアログを出す';

// 以下フォントの検証 --------------------------------------

export const KaushanScript = Template.bind({});
KaushanScript.args = Template.args;
KaushanScript.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
KaushanScript.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Kaushan Script',
        fixed: 'Anton',
        inputButton: 'Kaushan Script',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const Oswald = Template.bind({});
Oswald.args = Template.args;
Oswald.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Oswald.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Oswald',
        fixed: 'Anton',
        inputButton: 'Oswald',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const Quicksand = Template.bind({});
Quicksand.args = Template.args;
Quicksand.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Quicksand.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Quicksand',
        fixed: 'Anton',
        inputButton: 'Quicksand',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const RobotoCondensed = Template.bind({});
RobotoCondensed.args = Template.args;
RobotoCondensed.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
RobotoCondensed.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Roboto Condensed',
        fixed: 'Anton',
        inputButton: 'Roboto Condensed',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const Vollkorn = Template.bind({});
Vollkorn.args = Template.args;
Vollkorn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Vollkorn.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Vollkorn',
        fixed: 'Anton',
        inputButton: 'Vollkorn',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const AlegreyaSansSC = Template.bind({});
AlegreyaSansSC.args = Template.args;
AlegreyaSansSC.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
AlegreyaSansSC.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Alegreya Sans SC',
        fixed: 'Anton',
        inputButton: 'Alegreya Sans SC',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const AmaticSC = Template.bind({});
AmaticSC.args = Template.args;
AmaticSC.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
AmaticSC.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Amatic SC',
        fixed: 'Anton',
        inputButton: 'Amatic SC',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const Anton = Template.bind({});
Anton.args = Template.args;
Anton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Anton.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Anton',
        fixed: 'Anton',
        inputButton: 'Anton',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const Bangers = Template.bind({});
Bangers.args = Template.args;
Bangers.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Bangers.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Bangers',
        fixed: 'Anton',
        inputButton: 'Bangers',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const CherrySwash = Template.bind({});
CherrySwash.args = Template.args;
CherrySwash.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
CherrySwash.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Cherry Swash',
        fixed: 'Anton',
        inputButton: 'Cherry Swash',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const Corben = Template.bind({});
Corben.args = Template.args;
Corben.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Corben.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Corben',
        fixed: 'Anton',
        inputButton: 'Corben',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const Creepster = Template.bind({});
Creepster.args = Template.args;
Creepster.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Creepster.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Creepster',
        fixed: 'Anton',
        inputButton: 'Creepster',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const Economica = Template.bind({});
Economica.args = Template.args;
Economica.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Economica.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Economica',
        fixed: 'Anton',
        inputButton: 'Economica',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const PermanentMarker = Template.bind({});
PermanentMarker.args = Template.args;
PermanentMarker.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
PermanentMarker.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Permanent Marker',
        fixed: 'Anton',
        inputButton: 'Permanent Marker',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];

export const LondrinaShadow = Template.bind({});
LondrinaShadow.args = Template.args;
LondrinaShadow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
LondrinaShadow.decorators = [
  Story => (
    <FontFamilyContext.Provider
      value={createFontFamilyValue({
        normal: 'Londrina Shadow',
        fixed: 'Anton',
        inputButton: 'Londrina Shadow',
      })}
    >
      <Story />
    </FontFamilyContext.Provider>
  ),
];
