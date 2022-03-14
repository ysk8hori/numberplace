import { useState } from 'react';
import './App.css';
import { generateGame } from '@ysk8hori/numberplace-generator';

function App() {
  const [puzzle, correct] = generateGame({ height: 3, width: 3 });

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 20px)',
        }}
      >
        {puzzle.cells.map(cell => {
          return (
            <div
              key={`${cell.pos[0]}-${cell.pos[1]}`}
              style={{ border: '1px solid black' }}
            >
              {cell.answer ?? ' '}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 20px)',
        }}
      >
        {correct.cells.map(cell => {
          return (
            <div
              key={`${cell.pos[0]}-${cell.pos[1]}`}
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
