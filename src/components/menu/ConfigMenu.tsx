import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { atomOfAnswerImageVariant } from '../atoms';
import Button from '../atoms/Button';
import './ConfigMenu.scss';

export default function ConfigMenu() {
  const [variant, setVariant] = useRecoilState(atomOfAnswerImageVariant);
  const onSelectNum = useCallback(() => setVariant('num'), [setVariant]);
  const onSelectIcon = useCallback(() => setVariant('asobi'), [setVariant]);
  const numClass = useMemo(
    () => (variant === 'num' ? 'svg-checked' : 'svg-unchecked'),
    [variant],
  );
  const iconClass = useMemo(
    () => (variant === 'asobi' ? 'svg-checked' : 'svg-unchecked'),
    [variant],
  );
  return (
    <div className="shadow border-zinc-500 rounded p-2">
      <Button className="text-base block" variant="text" onClick={onSelectNum}>
        <span className={numClass}></span>数字で遊ぶ
      </Button>
      <Button className="text-base block" variant="text" onClick={onSelectIcon}>
        <span className={iconClass}></span>アイコンで遊ぶ
      </Button>
    </div>
  );
}
