const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
      const users = await User.find().select('-password -accessToken')
      res.json(users);
    } catch (error) {
        next(error);   
    }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -accessToken');
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