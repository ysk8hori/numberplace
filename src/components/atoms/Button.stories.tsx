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
    <Button type="flat">Hello</Button>
    <Button type="flat" disabled>
      Disabled
    </Button>
  </Container>
);
export const Flat = FlatTemplate.bind({});

const OutlinedTemplate: ComponentStory<typeof Button> = () => (
  <Container>
    <Button type="outlined">Hello</Button>
    <Button type="outlined" disabled>
      Disabled
    </Button>
  </Container>
);
export const OutLined = OutlinedTemplate.bind({});

const TextTemplate: ComponentStory<typeof Button> = () => (
  <Container>
    <Button type="text">Hello</Button>
    <Button type="text" disabled>
      Disabled
    </Button>
  </Container>
);
export const Text = TextTemplate.bind({});
