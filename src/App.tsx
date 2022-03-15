import { useState } from 'react';
import './App.css';
import { generateGame } from '@ysk8hori/numberplace-generator';
import Cell from './components/Cell';

function App() {
  const [puzzle, correct] = generateGame({ height: 3, width: 3 });

  return (
    <>
      <div className="aspect-square max-w-screen-sm max-h-screen grid grid-cols-9 box-border">
        {puzzle.cells.map(cell => (
          <Cell answer={cell.answer} key={`${cell.pos[0]}-${cell.pos[1]}`} />
        ))}
      </div>
    </>
  );
}

export default App;
