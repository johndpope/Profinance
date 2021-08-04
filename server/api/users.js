const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

//get all users
router.get('/', async (req, res, next) => {
    try {
      const users = await User.find().select('-password')
      res.json(users);
    } catch (error) {
        next(error);   
    }
});

//get user by id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    next(error)
  }
})