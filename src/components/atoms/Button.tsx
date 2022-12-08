import clsx from 'clsx';
import React, { ComponentProps } from 'react';
import styled, { css } from 'styled-components';
import { ButtonState, ButtonVariant } from '../../theme/styled';

function getStyle(variant: ButtonVariant, state: ButtonState) {
  return css`
    ${({ theme: { button } }) => css`
      border-style: solid;
      border-width: ${button[variant][state].border_width};
      border-color: ${button[variant][state].border_color};
      background-color: ${button[variant][state].bg_color};
      color: ${button[variant][state].color};
    `}
  `;
}

const StyledButton = styled.button<{ buttonVariant: ButtonVariant }>`
  ${({ buttonVariant }) => getStyle(buttonVariant, 'normal')}
  &:hover {
    ${({ buttonVariant }) => getStyle(buttonVariant, 'hover')}
  }
  &:active {
    ${({ buttonVariant }) => getStyle(buttonVariant, 'active')}
  }
  &:disabled {
    ${({ buttonVariant }) => getStyle(buttonVariant, 'disabled')}
  }
`;

/**
 * 汎用ボタン
 */
function Button({
  variant = 'flat',
  onClick,
  disabled,
  children,
  className,
  ...rest
}: ComponentProps<typeof StyledButton> & { variant?: ButtonVariant }) {
  return (
    <StyledButton
      buttonVariant={variant}
      className={clsx('rounded-md px-2', className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
