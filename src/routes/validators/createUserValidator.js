const { body } = require('express-validator');

module.exports = [
    body('name', 'A felhasznalonevnek legalabb 4 karakterbol kell allnia.').isLength({min: 4}),
    body('email', 'Az email nem valid').isEmail(),
    body('password', 'A jelszonak legalabb 6 karakterbol kell allnia.').isLength({min: 6}),
    body('telephone', 'A telefonszámodnak 0 vagy legalább 10 karakterből kell állnia!').optional({checkFalsy: true ,nullable: true}).isLength({min: 10}),
]