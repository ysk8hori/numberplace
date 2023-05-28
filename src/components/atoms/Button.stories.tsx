import { Meta, StoryFn } from '@storybook/react';
import styled from 'styled-components';
import Button from './Button';

export default {
  component: Button,
} as Meta<typeof Button>;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const FlatTemplate: StoryFn<typeof Button> = () => (
  <Container>
    <Button variant="flat">Hello</Button>
    <Button variant="flat" disabled>
      Disabled
    </Button>
  </Container>
);
export const Flat = FlatTemplate.bind({});

const OutlinedTemplate: StoryFn<typeof Button> = () => (
  <Container>
    <Button variant="outlined">Hello</Button>
    <Button variant="outlined" disabled>
      Disabled
    </Button>
  </Container>
);
export const OutLined = OutlinedTemplate.bind({});

const TextTemplate: StoryFn<typeof Button> = () => (
  <Container>
    <Button variant="text">Hello</Button>
    <Button variant="text" disabled>
      Disabled
    </Button>
  </Container>
);
export const Text = TextTemplate.bind({});
