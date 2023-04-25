var express = require('express');
var router = express.Router();
const user = require('../controllers/userController')
// const reflection = require('../controllers/reflectionController')
const auth = require('../middlewares/auth')

router.post("/api/v1/users/register",user.register)
router.post("/api/v1/users/login",user.login)
// router.post('/api/v1/reflections',auth,reflection.createReflection)
// router.get('/api/v1/reflections',auth,reflection.getReflection)
// router.delete('/api/v1/reflections/:id',auth,reflection.deleteReflection)
// router.put('/api/v1/reflections/:id',auth,reflection.updateReflection)

module.exports = router;
