import axios from 'axios'
const baseUrl = '/api/users'

const no_blogs = async () =>
{
	const response = await axios.get(baseUrl)
	return response.data
  
}
const blogs= async (id) =>
{
	const response = await axios.get(baseUrl+'/'+id)
	console.log(response.data.blogs)
	return response.data.blogs
  
}
export default { no_blogs,blogs }
