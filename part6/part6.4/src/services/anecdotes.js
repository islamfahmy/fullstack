import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = {content}
  const response = await axios.post(baseUrl, object.content)
  return response.data
}
const vote=async(id)=>{
   console.log(baseUrl+id)
  const response= await axios.get(baseUrl+id)
  response.data.votes++
  await axios.put(baseUrl+id,response.data)

}
export default { getAll,createNew ,vote}