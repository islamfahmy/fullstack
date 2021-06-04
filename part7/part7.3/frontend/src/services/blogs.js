import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const get=(id)=>
{
  const request = axios.get(baseUrl+'/'+id)
  return request.then(response => response.data) 
}
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const change=async newObject => {
   console.log(newObject)
   const snd = baseUrl+'/'+newObject.id
  await axios.put(snd,newObject)
  }
const remove=async newObject => {
    console.log("here")
    console.log(newObject)
   const snd = baseUrl+'/'+newObject.id
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(snd,config)
  
  }

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(baseUrl)
  console.log(newObject)
  console.log(config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default {getAll,create,setToken,change,remove}