const express = require('express');
const { signUP, login } = require('../controller/authControler');
const router = express.Router();


router.post('/signup', signUP)
router.post('/login', login)
// router.post('./logout', logout)




module.exports = router;