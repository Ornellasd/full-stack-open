
import blogService from '../services/blogs'
import { setAlerts } from '../reducers/alertReducer'

const order = (a, b) => {
  return b.likes - a.likes
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'SET_BLOGS':
      return action.data.sort(order)
    case 'UPVOTE': {
      const id = action.data.id
      const blogToChange = state.find(b => b.id === id)
      const upvotedBlog = {
        ...blogToChange,
        likes: blogToChange.likes +=1
      }
      return state.map(blog => blog.id !== id ? blog: upvotedBlog).sort(order)
    }
    default:
      return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatch(setAlerts([`${newBlog.title} added`], 'success', 5))
      dispatch(getBlogs())
    } catch(e) {
      dispatch(setAlerts(Object.values(e.response.data), 'error', 5))
    }
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: blogs,
    })
  }
}

export const upvote = blog => {
  return async dispatch => {
    await blogService.update(blog)
    dispatch({
      type: 'UPVOTE',
      data: { id: blog.id }
    })
  }
}

export default blogReducer