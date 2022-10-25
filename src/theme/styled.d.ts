import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    button: AllButton;
  }
}

type AllButton = Record<ButtonType, ButtonSet>;
type ButtonSet = Record<ButtonState, ButtonBase>;
type ButtonBase = {
  border_color: string;
  border_width: string;
  bg_color: string;
  color: string;
};
export type ButtonType = 'flat' | 'outlined' | 'text';
export type ButtonState = 'normal' | 'hover' | 'active' | 'disabled';
