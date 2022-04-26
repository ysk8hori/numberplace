import { useLayoutEffect, useRef, useState } from 'react';

/**
 * フォントサイズを他の要素に合わせて変更したい場合に使用する hooks。
 * 返却値の boxRef をフォントをあわせたい要素に指定し、その要素に対するフォントサイズの比率を指定する。
 * @param ratio 要素の大きさに対するフォントサイズの大きさ
 */
export function useFontSize(ratio = 0.8) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('1rem');
  useLayoutEffect(() => {
    if (boxRef.current?.offsetWidth) {
      setFontSize(`${boxRef.current.offsetWidth * ratio}px`);
    }
  }, [boxRef.current?.offsetWidth]);
  return { fontSize, boxRef };
}
