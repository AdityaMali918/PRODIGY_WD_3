

import React, { useState } from 'react';

function Square({ value,onClick }) {
  return (
    <button className='text-white text-2xl p-3 m-2 gap-1' 
    onClick={onClick}
    >{value}</button>
  );
}

export default function Board() {
  // const[squares,setSquare]=useState(Array(9).fill(null));
  const [squares, setSquare] = useState(Array(9).fill(' '));
  const[isX,setIsX]=useState(true);


  const handleClick=(i)=>{
    if(calculateWinner(squares) || squares[i]==='O' || squares[i]==='X'){
      return
    }
    setSquare(squares)
    console.log(`Clicked square ${i}`);
    console.log(`${squares}`)
    squares[i]=isX?'X':'O';
  
    setIsX(!isX)
   
  }

  function calculateWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (squares[a] !== ' ' && squares[a] === squares[b] && squares[a] === squares[c]) {
        return winningPatterns[i];
      }
    }
  
    return null;
  }
  
  const winnerPattern = calculateWinner(squares);

let status;
if (winnerPattern) {
  const winnerSymbol = squares[winnerPattern[0]];
  status = `Winner: ${winnerSymbol}`;
} else if (squares.every(square => square !== ' ')) {
  status = 'It\'s a Tie!';
} else {
  status = `Next Player: ${isX ? 'X' : 'O'}`;
}

const handleRestart = () => {
  setSquare(Array(9).fill(' '));
  setIsX(true);
};

  return (
    <div className=' h-full m-48 gap-5'>
          <h1 className="text-white text-center mb-8 uppercase text-2xl">TIC-TAC-TOE</h1>
      <div className=' flex justify-center items-center gap-3 '>
        <Square value={squares[0]} onClick={()=> handleClick(0)} />
        <div className='border-x-4 border-indigo-500 '>
        <Square value={squares[1]} onClick={()=> handleClick(1)}/>
        </div>
        <Square value={squares[2]} onClick={()=> handleClick(2)}/>
      </div>
      <div className='flex justify-center items-center gap-3 border-t-4 border-indigo-500 w-48 m-auto' >
        <Square value={squares[3]} onClick={()=> handleClick(3)}/>
        
        <div className='border-x-4 border-indigo-500 gap-3 '>
        <Square value={squares[4]} onClick={()=> handleClick(4)}/>
        </div>

        <Square value={squares[5]} onClick={()=> handleClick(5)}/>
      </div>
      <div className='flex gap-3 justify-center items-center border-t-4 border-indigo-500 w-48 m-auto'>
        <Square value={squares[6]} onClick={()=> handleClick(6)}/>

        <div className='border-x-4 border-indigo-500 '>
        <Square value={squares[7]} onClick={()=> handleClick(7)}/>
        </div>
        
        <Square value={squares[8]} onClick={()=> handleClick(8)}/>
      </div>
      <div className='text-white text-center mt-5'>{status}</div>
      <div className='flex justify-center items-center'>
       <button className='mt-8 p-2 bg-blue-500 text-white  text-center' onClick={handleRestart}>
        Restart
      </button>
      </div>
    </div>
  );
}

