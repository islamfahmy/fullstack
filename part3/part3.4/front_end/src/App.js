import React, { useState,useEffect } from 'react'
import Person from './components/Note'
import server from './services/server'
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('eshta')
  const [ newNumber, setNewNumber ] = useState('01xxxxxxxx')
  const [search ,setSearch] = useState('type name to search for')
  const [showAll,setShowAll]= useState(true); 
  const personToShow = showAll ? persons: persons.filter(person => person.name.toUpperCase() === search.toUpperCase())
  useEffect(() => {server.getAll().then(response=>setPersons(response.data))},[])
const addName=(event)=>{
   
   event.preventDefault()
   const nameObject={
    name :newName,
    number :newNumber,
   }
   const tofind = persons.find(person=>person.name===newName)
   if(tofind!==undefined)
   { 
    window.confirm(`${newName} is already added to phonebook,replace the old number with a new one `)
    server.create(nameObject);
    tofind.number=newNumber
   }  
   else {
    server.create(nameObject)
   setPersons(persons.concat(nameObject))
      }
   setNewName('')
   setNewNumber('')
  }
  const handleChange=(event)=>
  {
    setNewName(event.target.value);

  }
  const handleChangeNum=(event)=>
  {
    setNewNumber(event.target.value)
  }
  const handleChangeSearch=(event)=>
  {
    setSearch(event.target.value)
  

  }
  const delete_person=(id,name)=>
  {  
    if(window.confirm("delete "+name)){
    server.remove(id);
   setPersons(persons.filter(person=>person.id!==id))}
  }
  return (
    <div>
      <h2>Phonebook</h2>
      
        <div>
          name:
           <input
           onChange={handleChangeSearch}
          value = {search}
           />
          
        <button onClick={() => setShowAll(!showAll)}>
           {showAll ? 'search' : 'showall' }
        </button>
          
        </div>
      
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:
           <input
           onChange={handleChange}
          value = {newName}
           />
        </div>
        <div>number: <input onChange={handleChangeNum}
          value = {newNumber}
           /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{ personToShow.map(person=> <Person key={person.id} person={person} delete_person={()=>delete_person(person.id,person.name)}/>)}</ul>
      
    </div>
  )
}

export default App
