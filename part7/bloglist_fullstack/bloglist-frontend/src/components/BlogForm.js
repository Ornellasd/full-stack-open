import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import Togglable from '../components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
  
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    dispatch(createBlog(content))

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <Togglable buttonLabel="create new blog">
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input name="title" />
        </div>
        <div>
          author:
          <input name="author" />
        </div>
        <div>
          url:
          <input name="url" />
        </div>
        <button id="blog-submit" type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm