import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputNoticeLayer from './InputNoticeLayer';
import { useEffect } from '@storybook/addons';
import { useInterval } from 'use-interval';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/game/InputNoticeLayer',
  component: InputNoticeLayer,
} as ComponentMeta<typeof InputNoticeLayer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputNoticeLayer> = args => {
  const beforeAfterList: Array<[string, string]> = [
    ['', '1'],
    ['1', '2'],
    ['2', ''],
  ];
  const [index, setIndex] = useState(0);
  console.log(index);
  const nextIndex = index + 1;
  useInterval(() => {
    if (nextIndex < beforeAfterList.length) {
      setIndex(nextIndex);
    } else {
      setIndex(0);
    }
  }, 2000);
  return <InputNoticeLayer {...args} beforeAfter={beforeAfterList[index]} />;
};

export const Default = Template.bind({});
Default.args = Template.args;
