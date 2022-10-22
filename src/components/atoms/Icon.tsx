import React, { ComponentProps } from 'react';
import styled from 'styled-components';

export type IconProps = {
  src: string;
  color: string;
};

const IconBase = styled.div<IconProps>`
  display: block;
  mask-image: url(${({ src }) => src});
  background-color: ${({ color }) => color};
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
`;

export const Icon = (props: ComponentProps<typeof IconBase>) => (
  <IconBase {...props} />
);
