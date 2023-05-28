import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import MistakeNoticeModal from './MistakeNoticeModal';

export default {
  component: MistakeNoticeModal,
} as Meta<typeof MistakeNoticeModal>;

const Template: ComponentStory<typeof MistakeNoticeModal> = args => (
  <MistakeNoticeModal {...args} />
);

export const HasMistake = Template.bind({});
