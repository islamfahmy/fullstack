
const init = 'empty'
const Setreducer = (state=init,action)=>
{
  if(action.type==='SET')
     return action.data;

  return ''
}
export default Setreducer