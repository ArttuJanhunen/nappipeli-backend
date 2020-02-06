const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users.map((user) => user.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

userRouter.post('/', async (req, res, next) => {

  const body = req.body

  const saltRounds = 10
  const password = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    password,
    points: 20,
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

userRouter.put('/:id', async (req, res, next) => {

  let user = await User.findById(req.params.id)

  user.points = user.points - 1

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, { new: true })
    res.json(updatedUser.toJSON())
  } catch (exception) {
    next(exception)
  }

})

userRouter.put('/:id/add', async (req, res, next) => {

  let user = await User.findById(req.params.id)
  const points = req.body.points

  user.points = points

  console.log(user)
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, { new: true })
    res.json(updatedUser.toJSON())
  } catch (exception) {
    next(exception)
  }

})

userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = userRouter