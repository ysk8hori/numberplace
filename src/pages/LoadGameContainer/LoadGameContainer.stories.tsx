import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
  ComponentStoryObj,
} from '@storybook/react';
import LoadGameContainer from '.';
import { blockSize_2_2, puzzle_2_2, solved_2_2 } from '../../utils/samples';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { useSetRecoilState } from 'recoil';
import { atomOfGame } from '../../atoms';

export default {
  component: LoadGameContainer,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12mini',
    },
  },
  decorators: [
    Story => {
      const setGame = useSetRecoilState(atomOfGame);
      setGame({
        puzzle: puzzle_2_2,
        solved: solved_2_2,
        blockSize: blockSize_2_2,
        cross: false,
        hyper: false,
      });
      return <Story />;
    },
  ],
} as ComponentMeta<typeof LoadGameContainer>;

export const Default: ComponentStoryObj<typeof LoadGameContainer> = {};
