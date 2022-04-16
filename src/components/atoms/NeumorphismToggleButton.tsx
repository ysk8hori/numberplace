import React from 'react';
import styled from 'styled-components';

const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
`;

const ToggleLabel = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 8px;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  ${ToggleInput}:checked + && {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      inset -3px -3px 5px rgba(255, 255, 255, 1);
    background: radial-gradient(yellow 10px, rgba(255, 255, 255, 0) 40%);
  }
`;

const Base = styled.div`
  display: inline-block;
  position: relative;
`;

/**
 * トグルボタン
 *
 * - チェック状態は親が管理する必要がある
 * - 大きさ程度なら親から class や style で指定可能
 */
function NeumorphismToggleButton({
  children,
  type: _,
  className,
  style,
  onClick,
  defaultChecked,
  id = 'toggle',
  'aria-label': ariaLabel,
}: React.ComponentProps<'input'>) {
  return (
    <Base style={style}>
      <ToggleInput
        id={id}
        {...{ onClick, defaultChecked }}
        aria-label={ariaLabel}
      />
      <ToggleLabel htmlFor={id} className={className}>
        {children}
      </ToggleLabel>
    </Base>
  );
}
export default NeumorphismToggleButton;
