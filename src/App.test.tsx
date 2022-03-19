import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { useStore } from './store/store'
import { render, screen, userEvent } from './test/utils'

describe('Simple working test', () => {
  test('the title is visible', () => {
    render(<App />)
    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  })
  test('shows empty state', () => {
    useStore.getState().newGame()
    render(<App />);
    expect(screen.queryByText('Game Over')).toBeNull();
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    expect(document.querySelector('main')?.textContent).toEqual('');
  })

  test('shows one row of guesses', () => {
    useStore.setState({ guesses: ['hello'] })
    render(<App />);
    expect(document.querySelector('main')?.textContent).toEqual('hello')
  })

  test('shows game over', () => {
    useStore.setState({ guesses: Array(6).fill('hello') })
    render(<App />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    userEvent.click(screen.getByText('New Game'))
    expect(document.querySelector('main')?.textContent).toEqual('')
  })
})