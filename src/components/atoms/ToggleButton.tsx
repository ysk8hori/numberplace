import './toggle-button.scss';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  width: 100%;
  height: 100%;
  cursor: pointer;
  :checked {
    background: radial-gradient(yellow 20px, rgba(255, 255, 255, 0) 60%);
  }
`;

/**
 * トグルボタン
 *
 * - チェック状態は親が管理する必要がある
 * - 大きさ程度なら親から class や style で指定可能
 */
function ToggleButton({
  type: _,
  className,
  style,
  onChange,
  checked,
  id = 'toggle',
  'aria-label': ariaLabel,
}: React.ComponentProps<'input'>) {
  return (
    <ToggleInput
      style={style}
      className={clsx(
        'toggle-button aspect-square w-full h-full rounded-lg flex justify-center items-center',
        className,
      )}
      id={id}
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
    />
  );
}
export default ToggleButton;
