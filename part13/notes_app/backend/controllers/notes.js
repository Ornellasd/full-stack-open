const router = require('express').Router()

const { User, Note } = require('../models')

router.get('/', async (req, res) => {
  const notes = await Note.findAll()

  console.log(JSON.stringify(notes, null, 2))

  res.json(notes)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne()
    const date = new Date()

    const note = await Note.create({
      ...req.body,
      date,
      userId: user.id
    })

    return res.json(note)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    console.log(note.toJSON())
    res.json(note)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    await note.destroy()
    res.status(200).end()
  } else {
    res.status(404).end()
  }
})

module.exports = router
