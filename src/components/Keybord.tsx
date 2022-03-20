export default function Keyboard() {
  return (
    <div className="flex flex-col">
      {keyboardKeys.map((keyboardRow, index) => (
          <div className="flex justify-center my-2 space-x-1" key={index}>
            {keyboardRow.map((key) => {
              let styles = 'rounded font-bold uppercase py-2 flex-1';
              if (key !== '') styles += ' bg-gray-400'
              return <button className={styles} key={key}>{key}</button>
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