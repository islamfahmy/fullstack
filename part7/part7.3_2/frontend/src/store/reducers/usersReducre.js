const reducer =(state=[] ,action)=>
{   
	if(action.type==='FETCH')
		return action.data
	return state
}
export default reducer