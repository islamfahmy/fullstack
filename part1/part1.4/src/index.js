import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button=(props)=>
(
<button onClick={props.handleclick }>{props.text}</button>
)
const Statistic=(props)=> <tr><td>{props.text}</td><td> {props.value}</td></tr>
const Staistics=(props)=>
{  let all =props.good+props.neutral+props.bad
   let avg = (props.good+props.neutral*0.5)/all
   let postive=props.good/all*100
  if(props.good===0&&props.neutral===0&&props.bad===0)
     return (
         <div>No feedback given</div>

     )
     return  (
      <table>
      <tbody><Statistic text="good" value ={props.good} /></tbody>
      <tbody><Statistic text="neutral" value ={props.neutral} /></tbody>
      <tbody><Statistic text="bad" value ={props.bad} /></tbody>
      <tbody><tr><td>all</td><td>{all}</td></tr></tbody>
      <tbody><tr><td>average</td><td>{avg}</td></tr></tbody>
      <tbody><tr><td>postive</td><td>{postive}%</td></tr></tbody>
      </table>
     )

}

const App = () => {
  
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
  <p><b>give feedback</b></p>  
  <Button handleclick={()=>setGood(good+1)} text={"good"}/>
  <Button handleclick={()=>setBad(bad+1)} text={"bad"}/>
  <Button handleclick={()=>setNeutral(neutral+1)} text={"neutral"}/> 
  <p><b>stastics</b></p>
   <Staistics good={good} bad={bad} neutral={neutral}/>
  
  
 
  
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)