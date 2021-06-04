const reducer = (state = '', action) => {

 if(action.type==='FILTER')
  {
    return state.filter(a=> a.content.includes(action.data))
  }

}