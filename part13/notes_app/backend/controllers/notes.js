const router = require('express').Router()

const Note = require('../models/note')

router.get('/', async (req, res) => {
  const notes = await Note.findAll()

  console.log(JSON.stringify(notes, null, 2))

  res.json(notes)
})

router.post('/', async (req, res) => {
  try {
    const date = new Date()
    const note = await Note.build(req.body)
    note.date = date
    await note.save()
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

module.exports = router