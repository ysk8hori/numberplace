import React, { useReducer } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToggleMemoButton from './ToggleMemoButton';
import { TiPencil } from 'react-icons/ti';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: ToggleMemoButton,
} as ComponentMeta<typeof ToggleMemoButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ToggleMemoButton> = args => (
  <ToggleMemoButton {...args}></ToggleMemoButton>
);
Template.args = {
  onClick: undefined,
};

export const Primary = Template.bind({});

export const Sample = () => {
  const [defaultChecked, toggle] = useReducer(
    defaultChecked => !defaultChecked,
    false,
  );
  return (
    <div>
      <p>defaultChecked の状態は親コンポーネントで管理する必要がある</p>
      <div style={{ width: '100px' }} className="aspect-square">
        <ToggleMemoButton
          className="aspect-square"
          defaultChecked={defaultChecked}
          onClick={toggle}
        >
          <TiPencil />
        </ToggleMemoButton>
      </div>
    </div>
  );
};
