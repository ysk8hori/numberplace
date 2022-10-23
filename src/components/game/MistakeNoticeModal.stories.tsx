import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MistakeNoticeModal from './MistakeNoticeModal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/game/MistakeNoticeModal',
  component: MistakeNoticeModal,
} as ComponentMeta<typeof MistakeNoticeModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MistakeNoticeModal> = args => (
  <MistakeNoticeModal {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = 'ミスなしの場合は表示しない';

export const HasMistake = Template.bind({});
HasMistake.storyName = 'ミスあり';
HasMistake.args = { mistake: true };
