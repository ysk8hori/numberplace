import React from 'react';
import { StoryFn, Meta } from '@storybook/react-webpack5';
import MistakeNoticeModal from './MistakeNoticeModal';

export default {
  component: MistakeNoticeModal,
} as Meta<typeof MistakeNoticeModal>;

const Template: StoryFn<typeof MistakeNoticeModal> = args => (
  <MistakeNoticeModal {...args} />
);

export const HasMistake = Template.bind({});
