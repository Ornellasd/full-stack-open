import blogService from '../services/blogs'
import { setAlerts } from '../reducers/alertReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'SET_BLOGS':
      return action.data.sort((a,b) => b.likes - a.likes)
    case 'UPVOTE': {
      const id = action.data.id
      const blogToChange = state.find(b => b.id === id)
      const upvotedBlog = {
        ...blogToChange,
        likes: blogToChange.likes +=1
      }
      return state.map(blog => blog.id !== id ? blog: upvotedBlog)
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

  // const changedBlog = { ...blog, likes: blog.likes += 1, user: blog.user.id }

    // blogService
    //   .update(blog.id, changedBlog)
    //   .then(returnedBlog => {
    //     setBlogLikes(returnedBlog.likes)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

export default blogReducer