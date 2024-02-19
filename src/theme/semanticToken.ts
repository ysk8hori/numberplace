import { DefaultTheme } from 'styled-components';
import colors from './colors';

const defaultToken = {
  button: {
    light: {
      flat: {
        normal: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.zinc[400],
          color: colors.zinc[50],
        },
        hover: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.zinc[500],
          color: colors.zinc[50],
        },
        active: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.zinc[400],
          color: colors.zinc[50],
        },
        disabled: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.zinc[300],
          color: colors.zinc[50],
        },
      },
      outlined: {
        normal: {
          border_width: '1px',
          border_color: colors.zinc[700],
          bg_color: colors.transparent,
          color: colors.zinc[700],
        },
        hover: {
          border_width: '1px',
          border_color: colors.zinc[700],
          bg_color: `${colors.zinc[700]}20`,
          color: colors.zinc[700],
        },
        active: {
          border_width: '1px',
          border_color: colors.zinc[700],
          bg_color: colors.transparent,
          color: colors.zinc[700],
        },
        disabled: {
          border_width: '1px',
          border_color: colors.zinc[400],
          bg_color: colors.transparent,
          color: colors.zinc[300],
        },
      },
      text: {
        normal: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.transparent,
          color: colors.zinc[700],
        },
        hover: {
          border_width: '0px',
          border_color: 'none',
          bg_color: `${colors.zinc[700]}20`,
          color: colors.zinc[700],
        },
        active: {
          border_width: '0px',
          border_color: 'none',
          bg_color: `${colors.zinc[700]}10`,
          color: colors.zinc[700],
        },
        disabled: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.transparent,
          color: colors.zinc[300],
        },
      },
    },
    dark: {
      flat: {
        normal: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.zinc[700],
          color: colors.zinc[50],
        },
        hover: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.zinc[500],
          color: colors.zinc[50],
        },
        active: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.zinc[700],
          color: colors.zinc[50],
        },
        disabled: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.zinc[800],
          color: colors.zinc[500],
        },
      },
      outlined: {
        normal: {
          border_width: '1px',
          border_color: colors.zinc[400],
          bg_color: colors.transparent,
          color: colors.zinc[300],
        },
        hover: {
          border_width: '1px',
          border_color: colors.zinc[300],
          bg_color: `${colors.zinc[300]}20`,
          color: colors.zinc[200],
        },
        active: {
          border_width: '1px',
          border_color: colors.zinc[300],
          bg_color: `${colors.zinc[300]}10`,
          color: colors.zinc[200],
        },
        disabled: {
          border_width: '1px',
          border_color: colors.zinc[700],
          bg_color: colors.transparent,
          color: colors.zinc[700],
        },
      },
      text: {
        normal: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.transparent,
          color: colors.zinc[300],
        },
        hover: {
          border_width: '0px',
          border_color: 'none',
          bg_color: `${colors.zinc[300]}20`,
          color: colors.zinc[300],
        },
        active: {
          border_width: '0px',
          border_color: 'none',
          bg_color: `${colors.zinc[300]}10`,
          color: colors.zinc[300],
        },
        disabled: {
          border_width: '0px',
          border_color: 'none',
          bg_color: colors.transparent,
          color: colors.zinc[700],
        },
      },
    },
  },
} satisfies DefaultTheme;
export default defaultToken;
