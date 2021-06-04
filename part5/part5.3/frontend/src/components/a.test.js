import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from '../forms/blog'

test('renders content', () => {
   const blog= {
    title:"eshta",
    author:"7amada"
   }
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'eshta'
  )
})
test('clicking like twice works !',()=>{
   const blog= {
    title:"eshta",
    author:"7amada",
    likes : 0
   }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} handlelike={mockHandler}/>
  )
   const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
  

})
test('blog form',()=>{
const blog= {
    title:"eshta",
    author:"7amada",
    likes : 0
   }
  const mockHandler = jest.fn()
  
  const component=render(<BlogForm  handleCreate={mockHandler} handleAuthor={mockHandler} handleurl={mockHandler} url="eshta"  handleTitle={mockHandler} title={blog.title} author={blog.author} erorMessage={"a7a"}/>)
    expect(component.container.querySelector('#author').value).toBe('7amada')
   expect(component.container.querySelector('#title').value).toBe('eshta')
          
   

})
