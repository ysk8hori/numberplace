import './toggle-memo-button.scss';
import React from 'react';
import { atomOfInputMode } from '../../../pages/GameContainer/atoms';
import styled from 'styled-components';
import { ButtonVariant } from '../../../theme/styled';
import { getButtonStyle } from '../../atoms/Button';
import { useAtom } from 'jotai';

const ToggleInput = styled.input.attrs({ type: 'checkbox' })<{
  buttonVariant: ButtonVariant;
}>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  &:checked {
    background: radial-gradient(yellow 20px, rgba(255, 255, 255, 0) 60%);
  }

  ${({ buttonVariant }) => getButtonStyle(buttonVariant, 'normal')}
  &:hover {
    ${({ buttonVariant }) => getButtonStyle(buttonVariant, 'hover')}
  }
  &:active {
    ${({ buttonVariant }) => getButtonStyle(buttonVariant, 'active')}
  }
  &:disabled {
    ${({ buttonVariant }) => getButtonStyle(buttonVariant, 'disabled')}
  }
`;

export default function ToggleMemoButton() {
  const [mode, setMode] = useAtom(atomOfInputMode);
  return (
    <ToggleInput
      buttonVariant="text"
      className={
        'toggle-memo-button aspect-square w-full h-full rounded-lg flex justify-center items-center'
      }
      checked={mode === 'memo'}
      onChange={ev => setMode(ev.target.checked ? 'memo' : 'answer')}
      aria-label="メモ"
    />
  );
}
