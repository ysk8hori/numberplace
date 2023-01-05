import { ThemeProvider } from 'styled-components';
import defaultToken from '../src/theme/semanticToken';
import '../src/index.scss';
import './story.css';
import { RecoilRoot } from 'recoil';
import * as jest from 'jest-mock';
window.jest = jest;

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
    <RecoilRoot>
      <ThemeProvider theme={defaultToken}>
        <Story />
      </ThemeProvider>
    </RecoilRoot>
  ),
];
