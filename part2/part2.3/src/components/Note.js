import React from 'react'

  const Single = ({ country }) => {
      
      return (
      <div> 
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      {country.languages.map(lang=> <ul>{lang.name}</ul>)}
       <img src = {country.flag} alt= {country.name}/>
       </div>      
          )
    }
  
export default Single