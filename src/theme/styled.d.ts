import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    button: { light: AllButton; dark: AllButton };
  }
}

type AllButton = Record<ButtonVariant, ButtonSet>;
type ButtonSet = Record<ButtonState, ButtonBase>;
type ButtonBase = {
  border_color: string;
  border_width: string;
  bg_color: string;
  color: string;
};
export type ButtonVariant = 'flat' | 'outlined' | 'text';
export type ButtonState = 'normal' | 'hover' | 'active' | 'disabled';
