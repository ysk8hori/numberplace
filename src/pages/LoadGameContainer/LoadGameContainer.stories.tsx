import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import LoadGameContainer from '.';
import { blockSize_2_2, puzzle_2_2, solved_2_2 } from '../../utils/samples';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { atomOfGame, atomOfSolved } from '../../atoms';
import { useAtom } from 'jotai';

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
      const [, setGame] = useAtom(atomOfGame);
      const [, setSolved] = useAtom(atomOfSolved);
      setGame({
        puzzle: puzzle_2_2,
        blockSize: blockSize_2_2,
        cross: false,
        hyper: false,
      });
      setSolved(solved_2_2);
      return <Story />;
    },
  ],
} as Meta<typeof LoadGameContainer>;

export const Default: StoryObj<typeof LoadGameContainer> = {};
