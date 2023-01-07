import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MistakeNoticeModal from './MistakeNoticeModal';

export default {
  component: MistakeNoticeModal,
} as ComponentMeta<typeof MistakeNoticeModal>;

const Template: ComponentStory<typeof MistakeNoticeModal> = args => (
  <MistakeNoticeModal {...args} />
);

export const HasMistake = Template.bind({});
