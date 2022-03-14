import { useState } from 'react';
import './App.css';
import { generateGame } from '@ysk8hori/numberplace-generator';

function App() {
  const [puzzle, correct] = generateGame({ height: 3, width: 3 });

  return (
    <>
      <div className="aspect-square max-w-screen-sm max-h-screen grid grid-cols-9 box-border">
        {puzzle.cells.map(cell => {
          return (
            <div
              key={`${cell.pos[0]}-${cell.pos[1]}`}
              className="box-border"
              style={{ border: '1px solid black' }}
            >
              {cell.answer ?? ' '}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
