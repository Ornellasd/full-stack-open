const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  return array.length === 1
    ? array[0].likes
    : array.reduce((accum, item) => accum + item.likes, 0) 
}

module.exports = {
  dummy,
  totalLikes,
}