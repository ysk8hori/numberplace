import { StoryFn, Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import Button from './Button';

export default {
  component: Button,
} as Meta<typeof Button>;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

export const Default: StoryObj<typeof Button> = {
  args: {
    variant: 'flat',
    disabled: false,
    children: 'Hello',
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

export const Flat: StoryFn<typeof Button> = () => (
  <Container>
    <Button variant="flat">Hello</Button>
    <Button variant="flat" disabled>
      Disabled
    </Button>
  </Container>
);

export const Outlined: StoryFn<typeof Button> = () => (
  <Container>
    <Button variant="outlined">Hello</Button>
    <Button variant="outlined" disabled>
      Disabled
    </Button>
  </Container>
);

export const Text: StoryFn<typeof Button> = () => (
  <Container>
    <Button variant="text">Hello</Button>
    <Button variant="text" disabled>
      Disabled
    </Button>
  </Container>
);
