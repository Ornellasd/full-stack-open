
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
      return state.map(blog => blog.id !== id ? blog: blogToChange).sort(order)
    }
    case 'ADD_COMMENT':
      console.log(action)
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

export const upvote = upvotedBlog => {
  return async dispatch => {
    await blogService.update(upvotedBlog)
    dispatch({
      type: 'UPVOTE',
      data: { id: upvotedBlog.id }
    })
  }
}

export const addComment = (comment, id) => {
  return async dispatch => {
    await blogService.addComment(comment, id)
    dispatch({
      type: 'ADD_COMMENT',
    })
  }
}

export default blogReducer