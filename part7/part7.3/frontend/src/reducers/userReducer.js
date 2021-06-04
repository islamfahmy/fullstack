const reducer =(state=null ,action)=>
{   
	if(action.type==='LOGIN')
		return action.data
	if(action.type==='LOGOUT')
		return null
	return state
}
export default reducer