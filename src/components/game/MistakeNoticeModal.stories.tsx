import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import MistakeNoticeModal from './MistakeNoticeModal';

export default {
  component: MistakeNoticeModal,
} as Meta<typeof MistakeNoticeModal>;

const Template: StoryFn<typeof MistakeNoticeModal> = args => (
  <MistakeNoticeModal {...args} />
);

export const HasMistake = Template.bind({});
