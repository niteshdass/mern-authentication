const express = require('express');
const { requireSignin, authMiddleware, AdminMiddleware} = require('../controllers/auth');
const { read } = require('../controllers/user');



const router = express.Router();

      router.get('/profile',requireSignin,authMiddleware,read)


module.exports = router;