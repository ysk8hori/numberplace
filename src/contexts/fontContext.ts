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

export const FontFamilyContext = createContext(createFontFamilyValue());
