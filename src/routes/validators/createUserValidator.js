const { body } = require('express-validator');

module.exports = [
    body('username', 'A felhasznalonevnek legalabb 4 karakterbol kell allnia.').isLength({min: 4}),
    body('email', 'Az email nem valid').isEmail(),
    body('password', 'A jelszonak legalabb 6 karakterbol kell allnia.').isLength({min: 6}),
]