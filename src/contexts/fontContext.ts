import { createContext } from 'react';

type FontFamilyValue = {
  fixed: string;
  normal: string;
  inputButton: string;
};

export function createFontFamilyValue(
  v?: Partial<FontFamilyValue>,
): Partial<FontFamilyValue> {
  return {
    ...v,
  };
}

export const FontFamilyContext = createContext(
  createFontFamilyValue({
    fixed: 'Roboto,sans-serif',
    inputButton: 'Roboto,sans-serif',
    normal: 'Roboto,sans-serif',
  }),
);
