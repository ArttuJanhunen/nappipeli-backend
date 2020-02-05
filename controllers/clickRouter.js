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

  const click = new Click({
    amount: 0,
  })

  try {
    const savedClick = await click.save()
    res.json(savedClick.toJSON())
  } catch (exception) {
    next(exception)
  }
})

clickRouter.put('/:id', async (req, res, next) => {

  const oldClicks = req.body.amount
  console.log('wtf '+oldClicks)

  const click = {
    amount: oldClicks + 1
  }

  try {
    const updatedClick = await Click.findByIdAndUpdate(req.params.id, click, { new: true })
    res.json(updatedClick.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = clickRouter