const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const restController = require('../controllers/api/restController')
const userController = require('../controllers/api/userController')
const businessController = require('../controllers/api/businessController')
const businessService = require('../services/businessService')

//passport middleware
const authenticated = passport.authenticate('jwt', { session: false })

const authenticatedBusiness = (req, res, next) => {
  if (req.user) {
    if (req.user.role === 'business') return next()
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

//router
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.get('/get_current_user', authenticated, userController.getUser)
router.get('/home', restController.getRestaurants)
router.get('/restaurant/:id', restController.getRestaurant)
router.get('/reservation/:id', restController.getMeals)
router.post('/comment', authenticated, userController.postComment)

router.get('/business/:id/restaurant', businessController.getRestaurant)
router.get('/business/:id/menu', businessController.getMenu)
router.put('/business/:id/restaurant', businessService.putRestaurant)
router.put('/business/:id/menu', businessController.putMenu)

module.exports = router