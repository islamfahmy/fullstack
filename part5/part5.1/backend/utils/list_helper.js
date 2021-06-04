const dummy = (blogs) => {
return 1
}
const totalLikes=(blogs)=>
{  if(blogs===undefined)
	 return 0
	return  blogs.reduce((acc,curr)=>
	{
	 return acc+curr.likes	
	},0)
	
}
const favoriteBlog=(blogs)=>
{
	 const x= blogs.reduce((acc,curr)=>
	 {
	 	return (curr.likes>acc.likes)? curr:acc
	 })
	 return {
  title: x.title,
  author: x.author,
  likes: x.likes
}
}
const mostBlogs=(blogs)=>
{   var authors= [];
	blogs.forEach(function (item, index) {
       var fi =authors.find((x)=>{return x.author===item.author})
        if(fi)
        {
         fi.no++;
        }
        else authors.push({
        	author:item.author,
            no :1
        })

     })
	return authors.reduce((acc,curr)=>
	 {
	 	return (curr.no>acc.no)? curr:acc
	 })


}
const mostLikes=(blogs)=>
{   var authors= [];
	blogs.forEach(function (item, index) {
       var fi =authors.find((x)=>{return x.author===item.author})
        if(fi)
        {
         fi.likes+=item.likes;
        }
        else authors.push({
        	author:item.author,
            likes :item.likes
        })

     })
	return authors.reduce((acc,curr)=>
	 {
	 	return (curr.likes>acc.likes)? curr:acc
	 })


}

module.exports = {
  dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}
