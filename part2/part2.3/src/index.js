import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'  
import axios from 'axios'
import Single from './components/Note'
import Weather from './components/weather'
const App = () => {
    const [countries ,setCountries]= useState([])
    const [search ,setSearch]=useState('search here')
    var itr;
    var keyo =0 
    const Print=()=>
    {  
         itr = countries.reduce((acc,el)=>{return el.name.toUpperCase().includes(search.toUpperCase())?acc+1:acc},0)
      if(itr===1)
      {
        const country = countries.find(x=>x.name.toUpperCase().includes(search.toUpperCase()));
        
       return(<div><Single key={keyo++} country={country}/>
              <Weather key = {keyo++} name={country.name}/></div>
             )
           
          }
       else if(itr<=10)
       {  const filtred= countries.filter(country=> country.name.toUpperCase().includes(search.toUpperCase()))
        return(filtred.map(country=><p key ={keyo++}>{country.name} <button key ={country.name} onClick={()=>setSearch(country.name)}> show</button> </p>))
        }
       return (  <div/>)
    
    }
    const hook=()=>
      {
      axios.get('https://restcountries.eu/rest/v2/all')
      .then(responce=>{
        console.log("promise fullfiled")
        setCountries(responce.data)
      })
    }
    useEffect(hook,[])
   const  handlechange =(event)=>
   {  
    setSearch(event.target.value)
      
   }
    return  ( 
      <div>
      <p >find countries <input onChange ={handlechange} value={search}/></p>
      <Print  />
     </div>
      )

}   
ReactDOM.render(<App />, document.getElementById('root'))