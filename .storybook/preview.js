import { ThemeProvider } from 'styled-components';
import defaultToken from '../src/theme/semanticToken';
import '../src/index.scss';
import './story.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
export const decorators = [
  Story => (
    <ThemeProvider theme={defaultToken}>
      <Story />
    </ThemeProvider>
  ),
];
