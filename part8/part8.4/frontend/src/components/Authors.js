  
import React,{useState,useEffect} from 'react'
import { gql, useQuery,useLazyQuery,useMutation } from '@apollo/client'
import {ALL_AUTHORS} from'../utils/queries'
import {SET_DATE} from '../utils/queries'

const Authors = (props) => {
  const [name,setName]=useState('')
  const [date,setDate]=useState('')
  const result = useQuery(ALL_AUTHORS)
  const [error,setError]=useState('')
  const [ setdate ] = useMutation(SET_DATE,{refetchQueries: [  {query: ALL_AUTHORS } ],
  onError: (error) => {
      setError('No such user in Database')
        setTimeout(() => {setError(null)}, 10000)
    }

})
  const handleChange = (event) => {
   
    setName(event.target.value);
    console.log(name)
  }


  const changeDate=(event)=>
  { 
   console.log(name)
   event.preventDefault()
   setdate({
      variables: {
        name: name.toString(),
        setBornTo: Number(date),
      }})
   setDate('')
   setName('')
  }
  if(!props.show)
    return null
  if (result.loading)  {
    return <div>loading...</div>
  }
  const authors=result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2> Set birthyear </h2>
      <div>{error}</div>
     <select value={name} onChange={handleChange}>
   {authors.map(a=><option key ={a.name} value={a.name}>{a.name}</option>)}
   </select>
          <div>
        born <input  type='number'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
    </div>  
       <button onClick={changeDate} type="button">edit</button>
              
    </div>
  )
}

export default Authors
