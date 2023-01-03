const { body } = require('express-validator');

module.exports = [
    body('username', 'A felhasznalonev mezo ures').isLength({min: 1}),
    body('password', 'A jelszo mezo ures').isLength({min: 1}),
]