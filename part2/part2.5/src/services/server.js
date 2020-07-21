import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update =  (id, newObject,notify) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data).catch(error=>notify(newObject.content+" is already deleted"))
}


const remove=(id)=>{
axios.delete(`${baseUrl}/${id}`	)  
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  remove: remove
}