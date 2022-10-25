import { DefaultTheme } from 'styled-components';
import colors from './colors';

const defaultToken: DefaultTheme = {
  button: {
    flat: {
      normal: {
        border_width: '0px',
        border_color: 'none',
        bg_color: colors.gray[700],
        color: colors.gray[200],
      },
      hover: {
        border_width: '0px',
        border_color: 'none',
        bg_color: colors.gray[600],
        color: colors.gray[200],
      },
      active: {
        border_width: '0px',
        border_color: 'none',
        bg_color: colors.gray[400],
        color: colors.gray[200],
      },
      disabled: {
        border_width: '0px',
        border_color: 'none',
        bg_color: colors.gray[300],
        color: colors.gray[50],
      },
    },
    outlined: {
      normal: {
        border_width: '1px',
        border_color: colors.gray[800],
        bg_color: colors.transparent,
        color: colors.gray[800],
      },
      hover: {
        border_width: '1px',
        border_color: colors.gray[800],
        bg_color: `${colors.gray[800]}20`,
        color: colors.gray[800],
      },
      active: {
        border_width: '1px',
        border_color: colors.gray[800],
        bg_color: colors.transparent,
        color: colors.gray[800],
      },
      disabled: {
        border_width: '1px',
        border_color: colors.gray[400],
        bg_color: colors.transparent,
        color: colors.gray[300],
      },
    },
    text: {
      normal: {
        border_width: '0px',
        border_color: 'none',
        bg_color: colors.transparent,
        color: colors.gray[800],
      },
      hover: {
        border_width: '0px',
        border_color: 'none',
        bg_color: `${colors.gray[800]}20`,
        color: colors.gray[800],
      },
      active: {
        border_width: '0px',
        border_color: 'none',
        bg_color: `${colors.gray[800]}10`,
        color: colors.gray[800],
      },
      disabled: {
        border_width: '0px',
        border_color: 'none',
        bg_color: colors.transparent,
        color: colors.gray[300],
      },
    },
  },
};
export default defaultToken;
