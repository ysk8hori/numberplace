import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import GameContainer from './GameContainer';
import {
  blockSize_2_3 as blockSize,
  puzzle_2_3 as puzzle,
} from '../utils/test-utils';
import styled from 'styled-components';
import { resolve_2_3 } from '../utils/storybookUtils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'containers/GameContainer',
  component: GameContainer,
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GameContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GameContainer> = args => (
  <GameContainer {...args} />
);
Template.args = {
  puzzle,
  blockSize,
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = Template.args;

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

const FontKaushanScript = styled.div`
  font-family: 'Kaushan Script';
`;
export const KaushanScript = Template.bind({});
KaushanScript.args = Template.args;
KaushanScript.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
KaushanScript.decorators = [
  Story => (
    <FontKaushanScript>
      <Story />
    </FontKaushanScript>
  ),
];

const FontOswald = styled.div`
  font-family: 'Oswald';
`;
export const Oswald = Template.bind({});
Oswald.args = Template.args;
Oswald.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Oswald.decorators = [
  Story => (
    <FontOswald>
      <Story />
    </FontOswald>
  ),
];

const FontQuicksand = styled.div`
  font-family: 'Quicksand';
`;
export const Quicksand = Template.bind({});
Quicksand.args = Template.args;
Quicksand.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Quicksand.decorators = [
  Story => (
    <FontQuicksand>
      <Story />
    </FontQuicksand>
  ),
];

const FontRobotoCondensed = styled.div`
  font-family: 'Roboto Condensed';
`;
export const RobotoCondensed = Template.bind({});
RobotoCondensed.args = Template.args;
RobotoCondensed.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
RobotoCondensed.decorators = [
  Story => (
    <FontRobotoCondensed>
      <Story />
    </FontRobotoCondensed>
  ),
];

const FontVollkorn = styled.div`
  font-family: 'Vollkorn';
`;
export const Vollkorn = Template.bind({});
Vollkorn.args = Template.args;
Vollkorn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Vollkorn.decorators = [
  Story => (
    <FontVollkorn>
      <Story />
    </FontVollkorn>
  ),
];

const FontAlegreyaSansSC = styled.div`
  font-family: 'Alegreya Sans SC';
`;
export const AlegreyaSansSC = Template.bind({});
AlegreyaSansSC.args = Template.args;
AlegreyaSansSC.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
AlegreyaSansSC.decorators = [
  Story => (
    <FontAlegreyaSansSC>
      <Story />
    </FontAlegreyaSansSC>
  ),
];

const FontAmaticSC = styled.div`
  font-family: 'Amatic SC';
`;
export const AmaticSC = Template.bind({});
AmaticSC.args = Template.args;
AmaticSC.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
AmaticSC.decorators = [
  Story => (
    <FontAmaticSC>
      <Story />
    </FontAmaticSC>
  ),
];

const FontAnton = styled.div`
  font-family: 'Anton';
`;
export const Anton = Template.bind({});
Anton.args = Template.args;
Anton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Anton.decorators = [
  Story => (
    <FontAnton>
      <Story />
    </FontAnton>
  ),
];

const FontBangers = styled.div`
  font-family: 'Bangers';
`;
export const Bangers = Template.bind({});
Bangers.args = Template.args;
Bangers.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Bangers.decorators = [
  Story => (
    <FontBangers>
      <Story />
    </FontBangers>
  ),
];

const FontCherrySwash = styled.div`
  font-family: 'Cherry Swash';
`;
export const CherrySwash = Template.bind({});
CherrySwash.args = Template.args;
CherrySwash.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
CherrySwash.decorators = [
  Story => (
    <FontCherrySwash>
      <Story />
    </FontCherrySwash>
  ),
];

const FontCorben = styled.div`
  font-family: 'Corben';
`;
export const Corben = Template.bind({});
Corben.args = Template.args;
Corben.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Corben.decorators = [
  Story => (
    <FontCorben>
      <Story />
    </FontCorben>
  ),
];

const FontCreepster = styled.div`
  font-family: 'Creepster';
`;
export const Creepster = Template.bind({});
Creepster.args = Template.args;
Creepster.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Creepster.decorators = [
  Story => (
    <FontCreepster>
      <Story />
    </FontCreepster>
  ),
];

const FontEconomica = styled.div`
  font-family: 'Economica';
`;
export const Economica = Template.bind({});
Economica.args = Template.args;
Economica.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
Economica.decorators = [
  Story => (
    <FontEconomica>
      <Story />
    </FontEconomica>
  ),
];

const FontPermanentMarker = styled.div`
  font-family: 'Permanent Marker';
`;
export const PermanentMarker = Template.bind({});
PermanentMarker.args = Template.args;
PermanentMarker.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
PermanentMarker.decorators = [
  Story => (
    <FontPermanentMarker>
      <Story />
    </FontPermanentMarker>
  ),
];

const FontLondrinaShadow = styled.div`
  font-family: 'Londrina Shadow';
`;
export const LondrinaShadow = Template.bind({});
LondrinaShadow.args = Template.args;
LondrinaShadow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await resolve_2_3(canvas);
};
LondrinaShadow.decorators = [
  Story => (
    <FontLondrinaShadow>
      <Story />
    </FontLondrinaShadow>
  ),
];
