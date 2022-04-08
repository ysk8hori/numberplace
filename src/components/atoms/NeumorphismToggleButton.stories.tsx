import React, { useReducer } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NeumorphismToggleButton from './NeumorphismToggleButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/atoms/NeumorphismToggleButton',
  component: NeumorphismToggleButton,
} as ComponentMeta<typeof NeumorphismToggleButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NeumorphismToggleButton> = args => (
  <NeumorphismToggleButton {...args}></NeumorphismToggleButton>
);
Template.args = {
  onClick: undefined,
  children: 'メモ',
};

export const Primary = Template.bind({});
Primary.args = Template.args;

export const Sample = () => {
  const [checked, toggle] = useReducer(checked => !checked, false);
  return (
    <div>
      <p>checked の状態は親コンポーネントで管理する必要がある</p>
      <NeumorphismToggleButton
        className="aspect-square"
        checked={checked}
        onClick={toggle}
      >
        hello
      </NeumorphismToggleButton>
    </div>
  );
};
