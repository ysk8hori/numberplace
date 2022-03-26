import './App.css';
import { generateGame } from '@ysk8hori/numberplace-generator';
import GameContainer from './containers/GameContainer';

function App() {
  const blockSize = { height: 2, width: 2 };
  const [puzzle, corrected] = generateGame(blockSize);
  console.log(puzzle.toString());
  console.log(JSON.stringify(puzzle));
  return (
    <GameContainer
      puzzle={puzzle}
      corrected={corrected}
      blockSize={blockSize}
    />
  );
}

export default App;
