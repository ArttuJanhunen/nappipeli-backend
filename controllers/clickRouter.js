const clickRouter = require('express').Router()
const Click = require('../models/click')

clickRouter.get('/', async (req, res, next) => {
  try {
    const click = await Click.find({})
    res.json(click.map((click) => click.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

clickRouter.post('/', async (req, res, next) => {
  const body = req.body

  const click = new Click({
    click: body.amount,
  })

  try {
    const savedClick = await click.save()
    res.json(savedClick.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = clickRouter