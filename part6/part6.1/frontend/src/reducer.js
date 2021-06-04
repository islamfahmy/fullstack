const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const newstate = {...state}
 console.log(newstate)
  switch (action.type) {
    case 'GOOD':
     {   newstate.good++; return newstate}
    case 'OK':
      {  newstate.ok++; return newstate}
    case 'BAD':
      {  newstate.bad++; return newstate}
    case 'ZERO':
      {  newstate.good=newstate.ok=newstate.bad=0; return newstate}
    default: return state
  }
  
}

export default counterReducer