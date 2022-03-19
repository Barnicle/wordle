import { LetterState, LETTER_LENGTH } from "../word-utils";


interface WordRowProps {
  letters: string;
  result?: LetterState[];
}

interface CharacterBoxProps {
  value: string,
  state: LetterState
}

const LetterStateStyles = {
  [LetterState.Miss]: 'bg-gray-500 border-gray-500',
  [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
  [LetterState.Match]: 'bg-green-500 border-green-500'
}

export default function WordRow({
  letters: lettersProp = '',
  result = [] }: WordRowProps) {
  const letterRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split('')
    .concat(Array(letterRemaining).fill(''));

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) =>
        <CharacterBox key={index} value={char}  state={result[index]} />)}
    </div>
  )
}


function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles = state === null ? '': LetterStateStyles[state]
  return (
    <span className={`incline-block border-2 text-center p-4
    before:inline-block before:content-['_'] uppercase text-2xl font-bold ${stateStyles}`}>
      {value}
    </span>
  )
}