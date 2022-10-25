import clsx from 'clsx';
import React, { ComponentProps } from 'react';
import styled, { css } from 'styled-components';
import { ButtonState, ButtonType } from '../../theme/styled';

function getStyle(type: ButtonType, state: ButtonState) {
  return css`
    ${({ theme: { button } }) => css`
      border-style: solid;
      border-width: ${button[type][state].border_width};
      border-color: ${button[type][state].border_color};
      background-color: ${button[type][state].bg_color};
      color: ${button[type][state].color};
    `}
  `;
}

const StyledButton = styled.button<{ buttonType: ButtonType }>`
  ${({ buttonType }) => getStyle(buttonType, 'normal')}
  &:hover {
    ${({ buttonType }) => getStyle(buttonType, 'hover')}
  }
  &:active {
    ${({ buttonType }) => getStyle(buttonType, 'active')}
  }
  &:disabled {
    ${({ buttonType }) => getStyle(buttonType, 'disabled')}
  }
`;

/**
 * 汎用ボタン
 */
function Button({
  type = 'flat',
  onClick,
  disabled,
  children,
  className,
  ...rest
}: ComponentProps<typeof StyledButton> & { type?: ButtonType }) {
  return (
    <StyledButton
      buttonType={type}
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
