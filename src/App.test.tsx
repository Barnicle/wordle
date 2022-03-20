import { describe, expect } from 'vitest'
import App from './App'
import { useStore } from './store/store'
import { render, screen } from './test/utils'

describe('Simple working test', () => {
  test('the title is visible', () => {
    render(<App />)
    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  })
  test('shows empty state', () => {
    useStore.getState().newGame([])
    render(<App />);
    expect(screen.queryByText('Game Over')).toBeNull();
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    expect(document.querySelector('main')?.textContent).toEqual('');
  })

  test('shows one row of guesses', () => {
    useStore.getState().newGame(['hello'])
    render(<App />);
    expect(document.querySelector('main')?.textContent).toEqual('hello')
  })

  test('shows lost game over state', () => {
    useStore.getState().newGame(Array(2).fill('hello'))
    const asnwer = useStore.getState().answer;
    useStore.getState().addGuess(asnwer)
    render(<App />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  })
  test('can start a new game', () => {
    useStore.getState().newGame(Array(6).fill('hello'))
    render(<App />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  })
})