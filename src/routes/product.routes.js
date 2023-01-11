const productController = require('../controllers/product.controller');
const router = require('express').Router();
const { verifyToken } = require('../middleware/verifyJwt');
const fileUpload = require('../middleware/file-upload');

router.get('/products', productController.getProducts);
router.get('/my-products', verifyToken, productController.getProductsByUserId);
router.post('/product', verifyToken, fileUpload.array('files'), productController.createProduct);
router.patch('/product/:id', verifyToken, fileUpload.array('files'), productController.updateProduct);
router.delete('/product/:id', verifyToken, productController.deleteProductById);
router.get('/product/:id', productController.getProductById);

module.exports = router;