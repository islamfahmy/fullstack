const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  if (action.type==='VOTE')
  {
    const id = action.data.id ;
    const change = {...state.find(s=> s.id===id)}
    change.votes++;
    return state.map(s=> s.id===id?change:s).sort(function(a, b) {
  return b.votes - a.votes;
})

  }
  else if(action.type==='CREATE')
  {  return state.concat(action.content)

  }
  else if(action.type==='FILTER')
  {
    return state.filter(a=> a.content.includes(action.data))
  }
  else if(action.type==='INIT')
  { console.log(action.data)
    return action.data;
  }

  return state

}


export default reducer