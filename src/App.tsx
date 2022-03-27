import './App.css';
import { generateGame } from '@ysk8hori/numberplace-generator';
import GameContainer from './containers/GameContainer';
import { useReducer } from 'react';

function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const blockSize = { height: 2, width: 2 };
  const [puzzle, corrected] = generateGame(blockSize);
  console.log(puzzle.toString());
  console.log(JSON.stringify(puzzle));
  return (
    <div className="w-screen h-screen flex justify-center">
      <GameContainer
        puzzle={puzzle}
        corrected={corrected}
        blockSize={blockSize}
        onRegenerate={forceUpdate}
      />
    </div>
  );
}

export default App;
