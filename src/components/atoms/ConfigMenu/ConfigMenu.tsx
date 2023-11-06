import React, { useState } from 'react';
import MenuStack from './MenuStack';
import MenuButton from './MenuButton/MenuButton';

export default function ConfigMenu({
  onQuit,
}: {
  /** ゲームをやめるコールバック */
  onQuit?: () => void;
}) {
  const [isShowConfig, showConfig] = useState<boolean>(false);
  return (
    <>
      <MenuStack
        isShow={isShowConfig}
        onSelected={() => showConfig(false)}
        className="fixed bottom-4 right-16"
        onQuit={onQuit}
      ></MenuStack>
      <MenuButton
        onClick={() => showConfig(!isShowConfig)}
        className="fixed bottom-4 right-4"
      />
    </>
  );
}
