import './App.css';
import { generateGame } from '@ysk8hori/numberplace-generator';
import GameBoard from './components/GameBoard';

function App() {
  const blockSize = { height: 2, width: 2 };
  const [puzzle, correct] = generateGame(blockSize);
  console.log(puzzle.toString());
  console.log(JSON.stringify(puzzle));
  return <GameBoard puzzle={puzzle} blockSize={blockSize} />;
}

export default App;
