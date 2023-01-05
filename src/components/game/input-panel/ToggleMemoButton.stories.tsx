import React, { useReducer } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToggleMemoButton from './ToggleMemoButton';
import { TiPencil } from 'react-icons/ti';

export default {
  component: ToggleMemoButton,
} as ComponentMeta<typeof ToggleMemoButton>;

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
