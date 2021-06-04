import React from 'react'
const blogForm=({ 
	handleCreate,
	handleTitle,
	handleAuthor,
	handleurl,
	title,
	author,
	url,
	errorMessage})=>{
	return (
 	<form onSubmit={handleCreate}>
   <div>
   {errorMessage}
   <h2>create blog</h2>
        title &nbsp;
          <input
          type="text"
          id='title'
          value={title }
          name="title"
          onChange={handleTitle}
        />
      </div>
      <div>
        author &nbsp;
          <input
           id='author'
          type="text"
          value={author}
          name="author"
          onChange={handleAuthor}
        />
      </div>
      <div>
        url &nbsp;
          <input

          type="text"
          value={url }
          name="url"
          onChange={handleurl}
        />
      </div>
        <h1>{errorMessage}</h1>
      <button type="submit">create</button>
    </form>
		)
}
export default blogForm