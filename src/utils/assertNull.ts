export function assertNull<T>(t: T | null): t is T {
  if (t === null) {
    throw new Error('null を許容しない値が null です。');
  }
  return true;
}

export function assertUndefined<T>(t: T | undefined): t is T {
  if (t === undefined) {
    throw new Error('undefined を許容しない値が undefined です。');
  }
  return true;
}

export function assertNullOrUndefined<T>(t: T | null | undefined): t is T {
  return assertNull(t) && assertUndefined(t);
}
