import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import LoadGameContainer from '.';
import { blockSize_2_2, puzzle_2_2, solved_2_2 } from '../../utils/samples';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { atomOfGame, atomOfSolved, SaveData } from '../../atoms';
import { TestProvider } from '../../utils/test-utils';

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
      const game = {
        puzzle: puzzle_2_2,
        blockSize: blockSize_2_2,
        cross: false,
        hyper: false,
      } satisfies SaveData;
      return (
        <TestProvider
          initialValues={[
            [atomOfGame, game],
            [atomOfSolved, solved_2_2],
          ]}
        >
          <Story />
        </TestProvider>
      );
    },
  ],
} as Meta<typeof LoadGameContainer>;

export const Default: StoryObj<typeof LoadGameContainer> = {};
