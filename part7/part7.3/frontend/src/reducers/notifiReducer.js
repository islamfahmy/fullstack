const reducer =(state='' ,action)=>
{   
	if(action.type==='SET')
		return action.data
	if(action.type==='REMOVE')
		return ''
	return state
}
export default reducer