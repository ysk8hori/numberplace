import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import semanticToken from '../theme/semanticToken';
import React, { ReactNode } from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { Provider } from 'jotai';

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => {
      return <ThemeProvider theme={semanticToken}>{children}</ThemeProvider>;
    },
    ...options,
  });

const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: Parameters<typeof useHydrateAtoms>[0];
  children: ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

export const TestProvider = ({
  initialValues,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
  children: ReactNode;
}) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };

export * from './samples';

export function resolve_2_3(option?: { finish?: boolean }) {
  // 1行目
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.keyboard('6');
  userEvent.click(screen.getByTestId('2,0'));
  userEvent.keyboard('1');
  // 2行目
  userEvent.click(screen.getByTestId('1,1'));
  userEvent.keyboard('5');
  userEvent.click(screen.getByTestId('2,1'));
  userEvent.keyboard('3');
  userEvent.click(screen.getByTestId('3,1'));
  userEvent.keyboard('6');
  userEvent.click(screen.getByTestId('4,1'));
  userEvent.keyboard('2');
  // 3行目
  userEvent.click(screen.getByTestId('1,2'));
  userEvent.keyboard('4');
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.keyboard('5');
  userEvent.click(screen.getByTestId('4,2'));
  userEvent.keyboard('1');
  userEvent.click(screen.getByTestId('5,2'));
  userEvent.keyboard('6');
  // 4行目
  userEvent.click(screen.getByTestId('0,3'));
  userEvent.keyboard('2');
  userEvent.click(screen.getByTestId('3,3'));
  userEvent.keyboard('5');
  userEvent.click(screen.getByTestId('4,3'));
  userEvent.keyboard('4');
  userEvent.click(screen.getByTestId('5,3'));
  userEvent.keyboard('3');
  // 5行目
  userEvent.click(screen.getByTestId('0,4'));
  userEvent.keyboard('5');
  userEvent.click(screen.getByTestId('1,4'));
  userEvent.keyboard('3');
  userEvent.click(screen.getByTestId('3,4'));
  userEvent.keyboard('1');
  userEvent.click(screen.getByTestId('4,4'));
  userEvent.keyboard('6');
  // 5行目
  userEvent.click(screen.getByTestId('0,5'));
  userEvent.keyboard('1');
  userEvent.click(screen.getByTestId('3,5'));
  userEvent.keyboard('3');
  const finish = () => {
    userEvent.click(screen.getByTestId('5,5'));
    userEvent.keyboard('2');
  };
  return option?.finish ? finish() : finish;
}
