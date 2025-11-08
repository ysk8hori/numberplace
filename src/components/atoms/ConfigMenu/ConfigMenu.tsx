import React, { useState } from 'react';
import MenuStack from './MenuStack';
import MenuButton from './MenuButton/MenuButton';

const CONFIG_MENU_ID = 'config-menu';

export default function ConfigMenu({
  onQuit,
}: {
  /** ゲームをやめるコールバック */
  onQuit?: () => void;
}) {
  return (
    <>
      <MenuStack onQuit={onQuit} id={CONFIG_MENU_ID}></MenuStack>
      <MenuButton
        className="fixed bottom-4 right-4"
        popovertarget={CONFIG_MENU_ID}
      />
    </>
  );
}
