import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputNoticeLayer from './InputNoticeLayer';
import { useInterval } from 'use-interval';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/game/InputNoticeLayer',
  component: InputNoticeLayer,
} as ComponentMeta<typeof InputNoticeLayer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputNoticeLayer> = args => {
  const beforeAfterList: Array<[string, string]> = [
    // ['', '1'],
    ['1', '2'],
    // ['2', ''],
  ];
  const [index, setIndex] = useState(0);
  const nextIndex = index + 1;
  useInterval(() => {
    if (nextIndex <= beforeAfterList.length) {
      setIndex(nextIndex);
    } else {
      setIndex(0);
    }
  }, 3000);
  return <InputNoticeLayer {...args} beforeAfter={beforeAfterList[index]} />;
};
Template.decorators = [
  Story => (
    <div className="w-96 bg-white">
      <Story />
    </div>
  ),
];

export const Default = Template.bind({});
Default.args = Template.args;
Default.decorators = Template.decorators;
