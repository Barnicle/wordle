import { computeGuess, LetterState } from "../word-utils";

const LETTER_LENGTH = 5;
interface WordRowProps {
  letters: string
}

const LetterStateStyles = {
  [LetterState.Miss]: 'bg-gray-500 border-gray-500',
  [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
  [LetterState.Match]: 'bg-green-500 border-green-500'
}

export default function WordRow({ letters: lettersProp = '' }: WordRowProps) {
  const letterRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split('')
    .concat(Array(letterRemaining).fill(''));
  const guessState = computeGuess(lettersProp)
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) =>
        <CharacterBox key={index} value={char} state={guessState[index]} />)}
    </div>
  )
}
interface CharacterBoxProps {
  value: string,
  state: LetterState
}

function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles = state === null ? '': LetterStateStyles[state]
  return (
    <div className={`incline-block border-2 text-center p-4 uppercase text-2xl font-bold ${stateStyles}`}>
      {value}
    </div>
  )
}