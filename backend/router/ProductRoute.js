const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController')

router.post('/',ProductController.set)
router.get('/',ProductController.get)
router.get('/:id',ProductController.getById)
router.delete('/:ord_id',ProductController.remove)


module.exports = router;