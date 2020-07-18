import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = (props) => (
  <button onClick={props .handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
     
  const [selected, setSelected] = useState(0)
  const [points, setpoints] = useState([0,0,0,0,0])
  const set=()=>
  { 
    let x= Math.floor(Math.random()*5)
    setSelected(x)
  }
  const vote=()=>
  {// points[x]+=1
    const copy = [...points]
    copy[selected]+=1
    setpoints(copy)
    
  }
   const getmost=()=>
   {
     let x =0 ;
     let maxi=0;
     while(x<points.length)
     {
       if(points[maxi]<points[x])
       maxi = x
       x++;
     }
     console.log(maxi)
     return maxi 

   }
  return (
    <div>
      <p><b>Anecdote of the day</b></p>
      {props.anecdotes[selected]}
      <div>has points {points[selected]}</div>
      <div><Button handleClick={() => set()} text="next ancedote" />
      <Button handleClick={() => vote()} text="vote" /></div>
      <p><b>Anecdote with most votes</b></p>
      {props.anecdotes[getmost()]}
            
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
  document.getElementById('root')
)