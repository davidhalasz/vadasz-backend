const userController = require('../controllers/user.controller');
const router = require('express').Router();
const { validationResult } = require('express-validator');
const loginUserValidator = require('./validators/loginUserValidator');
const createUserValidator = require('./validators/createUserValidator');
const verifyJwt = require('../middleware/verifyJwt');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
      return;
    }
    next();
  };
  

router.post('/regisztracio', createUserValidator, validateRequest, userController.createUser);
router.post('/activation/:uuid', userController.activation);

router.post('/belepes', loginUserValidator, validateRequest, userController.loginUser);

router.delete('/logout', userController.logout);

router.get('/currentuser', userController.checkToken);



module.exports = router;