const reducer =(state=null ,action)=>
{   
	if(action.type==='SET')
		return action.data
	if(action.type==='REMOVE')
		return null
	return state
}
export default reducer