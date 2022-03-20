import React from "react";
import useStore from "../store";
import { LetterState } from "../word-utils";

export default function Keyboard({ onClick: onClickProp }: {
  onClick: (letter: string) => void
}) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent
    onClickProp(letter!)
  }
  return (
    <div className="flex flex-col">
      {keyboardKeys.map((keyboardRow, indexRow) => (
          <div className="flex justify-center my-2 space-x-1" key={indexRow}>
            {keyboardRow.map((key, index) => {
              let styles = 'rounded font-bold uppercase py-2 flex-1';
              const letterState = LetterStateStyles[keyboardLetterState[key]];

              if (key === '') styles += ' pointer-events-none';
              if (letterState) {
                styles += ` ${letterState}`
              } else if (key !== '') styles += ' bg-gray-400';

              return <button className={styles} onClick={onClick} key={index}>{key}</button>
            })}
          </div>
        )
      )
      }
   </div>
 )
}

const keyboardKeys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',''],
  ['Enter','z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
]

const LetterStateStyles = {
  [LetterState.Miss]: 'bg-gray-500',
  [LetterState.Present]: 'bg-yellow-500',
  [LetterState.Match]: 'bg-green-500'
}