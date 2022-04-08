import React, { useReducer } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToggleMemoButton from './ToggleMemoButton';
import { TiPencil } from 'react-icons/ti';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/game/input-panel/ToggleMemoButton',
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
  const [checked, toggle] = useReducer(checked => !checked, false);
  return (
    <div>
      <p>checked の状態は親コンポーネントで管理する必要がある</p>
      <div style={{ width: '100px' }} className="aspect-square">
        <ToggleMemoButton
          className="aspect-square"
          checked={checked}
          onClick={toggle}
        >
          <TiPencil />
        </ToggleMemoButton>
      </div>
    </div>
  );
};
