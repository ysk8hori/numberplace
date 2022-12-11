import React, { useReducer } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToggleButton from './ToggleButton';
import { TiPencil } from 'react-icons/ti';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: ToggleButton,
} as ComponentMeta<typeof ToggleButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ToggleButton> = args => (
  <ToggleButton {...args}></ToggleButton>
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
      <p>defaultChecked の状態は親コンポーネントで管理する必要がある</p>
      <ToggleButton
        className="aspect-square"
        style={{ width: '100px' }}
        defaultChecked={checked}
        onClick={toggle}
      >
        <TiPencil style={{ width: '80%', height: '80%' }} />
      </ToggleButton>
    </div>
  );
};
