import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [input, setInput] = useState('')
  const [submitted, setSubmit] = useState(false)
  const [encryption, setEncryption] = useState('')

  const makeGrid = (row, col) => {
    let chart = [];
    for (let i = 0; i < row; i++) {
      chart.push(new Array(col));
    }
    return chart;
  }
  // fills the grid with the initial message
  const fillGrid = (message, grid, col) => {
    let arrMessage = message.split('');

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j] = arrMessage[j];
      }
      arrMessage.splice(0, col);
    }
    return grid;
  }
  // encrypts the message based on column of the grid
  const encrypt = (grid, row, col) => {
    let newMessage = '';

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        newMessage += grid[j][i];
      }
    }
    return newMessage;
  }

  const newEncryptMessage = (message, rowNum, colNum) => {

    if (rowNum * colNum !== message.length) return;

    let grid = makeGrid(rowNum, colNum);

    grid = fillGrid(message, grid, colNum);

    let encryptedMessage = encrypt(grid, rowNum, colNum);

    return setEncryption(encryptedMessage);
  }

  const findFactors = (length) => {
    let factors = [];
    for (let i = 1; i <= length; i++) {
      if (length % i == 0) {
        factors.push(i);
      }
    }
    console.log(factors,factors.length, length)
    if(factors.length === 2){
      window.alert(`Cannot encrypt: ${input} \nPlease enter another word or phrase to encrypt`)
      return {
        'cols': 0,
        'rows': 0
      }
    
    }
      if (factors.length % 2 === 0) {
        return {
          'cols': factors[Math.floor(factors.length / 2)],
          'rows': factors[Math.floor(factors.length / 2) - 1]
        }
      } else {
        return {
          'cols': factors[Math.floor(factors.length / 2)],
          'rows': factors[Math.floor(factors.length / 2)]
        }
      }
  }

  const handleInputChange = (e) => {
    setInput(e.currentTarget.value)
    setSubmit(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let gridSize = findFactors(input.length)
    setSubmit(true)
    newEncryptMessage(input, gridSize.cols, gridSize.rows)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <textarea onChange={handleInputChange} value={input} cols="50" placeholder='area' />
        </div>
        <input type="submit" />
      </form>
      {submitted
        ? <h2>{encryption}</h2>
        : null}

    </div>
  );
}

export default App;
