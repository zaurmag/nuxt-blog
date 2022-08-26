const passport = require('passport')
const { Router } = require('express')
const ctr = require('../controllers/post.controller')
const upload = require('../middleware/upload')
const router = Router()

// Admin
// /api/post/admin
router.post(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  ctr.create
)

router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  ctr.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.getById
)

router.put(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.update
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.remove
)

router.get(
  '/admin/get/analytics',
  passport.authenticate('jwt', { session: false }),
  ctr.analytics
)

// Base
// /api/post
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.put('/add/views/:id', ctr.addView)
module.exports = router
