import React, { useState } from 'react'
import Person from './components/person'
import PersonForm from './components/personform'
import Filter from './components/filter'
const App = () => {
  const [ persons, setPersons ] = useState([
    { content: 'Arto Hellas', number: '040-123456' },
    { content: 'Ada Lovelace', number: '39-44-5323523' },
    { content: 'Dan Abramov', number: '12-43-234345' },
    { content: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('eshta')
  const [ newNumber, setNewNumber ] = useState('01xxxxxxxx')
  const [search ,setSearch] = useState('type name to search for')
  const [showAll,setShowAll]= useState(true); 
  const personToShow = showAll
    ? persons
    : persons.filter(person => person.content.toUpperCase() === search.toUpperCase())
   const addName=(event)=>{
   
   event.preventDefault()
   const nameObject={
    content :newName,
    number :newNumber,
   }
   if(persons.some(x=>x.content===newName))
   { 
    window.alert(`${newName} is already added to phonebook`)
   }  
   else {
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
  return (
    <div>
      <h2>Phonebook</h2>
       <Filter handleChangeSearch={handleChangeSearch} search={search} trigger={() => setShowAll(!showAll)} showAll={showAll}/>  
      <h2>add a new</h2>
      <PersonForm addName={addName} handleChange={handleChange} handleChangeNum={handleChangeNum} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <ul>{ personToShow.map(person=> <Person key={person.content} person={person}/>)}</ul>
      
    </div>
  )
}

export default App
