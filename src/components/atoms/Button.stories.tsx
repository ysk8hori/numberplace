import { ComponentMeta, ComponentStory } from '@storybook/react';
import styled from 'styled-components';
import Button from './Button';

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const FlatTemplate: ComponentStory<typeof Button> = () => (
  <Container>
    <Button variant="flat">Hello</Button>
    <Button variant="flat" disabled>
      Disabled
    </Button>
  </Container>
);
export const Flat = FlatTemplate.bind({});

const OutlinedTemplate: ComponentStory<typeof Button> = () => (
  <Container>
    <Button variant="outlined">Hello</Button>
    <Button variant="outlined" disabled>
      Disabled
    </Button>
  </Container>
);
export const OutLined = OutlinedTemplate.bind({});

const TextTemplate: ComponentStory<typeof Button> = () => (
  <Container>
    <Button variant="text">Hello</Button>
    <Button variant="text" disabled>
      Disabled
    </Button>
  </Container>
);
export const Text = TextTemplate.bind({});
