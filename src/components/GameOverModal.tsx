import { useStore } from "../store/store";
import WordRow from "./WordRow";

export default function GameOverModal({ onClick: onClickProp }: {
  onClick: () => void
}) {
  const state = useStore()
  const isGameOver = state.gameState !== 'playing';

  return (
    <div role="modal" className="absolute
      rounded text-center bg-white border
      left-0 right-0 top-1/4 p-6 w-3/4 mx-auto border-gray-500" >
        Game Over!
        <WordRow letters={state.answer} />
        <button onClick={onClickProp} className="block border rounder border-green-500 bg-green-500 p-2 mt-4 mx-auto">New Game</button>
    </div>
)
}