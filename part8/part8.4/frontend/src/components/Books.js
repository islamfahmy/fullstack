import React,{useState,useEffect} from 'react'
import {  useQuery ,useLazyQuery} from '@apollo/client'
import {ALL_BOOKS,ALL_AUTHORS} from'../utils/queries'

const Books = (props) => {
    const[getBooks,result]=useLazyQuery(ALL_BOOKS) 
   const result2 = useQuery(ALL_AUTHORS)
   const [filter,setFilter]=useState('all')
   const [genres,setGenres]=useState([])
   useEffect(()=>{
   console.log(filter)
   getBooks({variables: {genre:filter}})
  
  },[filter])
    if (!props.show) {
      console.log("eaaaa")
       if(filter!=='all'||genres[0])
       { console.log("eshta ?")
        setFilter('all')
        setGenres([])
       }

    return null
  }
    if (result.loading)  {
    return <div>loading...</div>
  }

  const authors= result2.data.allAuthors
  const myset = new Set()
  const books = result.data.allBooks
  if(filter==='all'&&!genres[0])
  {  console.log("in")
    books.map(m=> {if(m.genres){m.genres.map(g=> myset.add(g))}})
    setGenres(Array.from(myset))
  } 
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{authors.find(b=>b.id===a.author).name }</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
     <div>{genres.map(g=> <button onClick={()=>setFilter(g)}>{g} </button> )} </div>
    </div>
  )
}

export default Books