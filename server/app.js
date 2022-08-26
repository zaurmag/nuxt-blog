const app = require('express')()
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt } = require('nuxt')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const commentsRoutes = require('./routes/comment.routes')
const keys = require('./keys')
const config = require('../nuxt.config')

mongoose.connect(keys.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
passport.use(passportStrategy)

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comments', commentsRoutes)

const nuxt = new Nuxt(config)

const {
  host = process.env.HOST || '127.0.0.1',
  port = process.env.PORT || 3000
} = nuxt.options.server

consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true
})

module.exports = app
