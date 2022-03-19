const LETTER_LENGTH = 5;
interface WordRowProps {
  letters: string
}
export default function WordRow({ letters: lettersProp = '' }: WordRowProps) {
  const letterRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split('')
    .concat(Array(letterRemaining).fill(''));
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char) =>
        <CharacterBox key={Math.random() * 10000} value={char} />)}
    </div>
  )
}
interface CharacterBoxProps {
  value: string
}

function CharacterBox({ value }: CharacterBoxProps) {
  return (
    <div className="incline-block border-2 text-center border-gray-500 p-4 uppercase text-2xl font-bold">
      {value}
    </div>
  )
}