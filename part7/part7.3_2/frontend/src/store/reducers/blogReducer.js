 
const reducer =(state= [] ,action)=>
{   
	if(action.type==='INIT')
		return action.data
	     
	return state
}
export default reducer