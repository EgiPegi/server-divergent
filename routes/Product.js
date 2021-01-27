const express = require('express');
const { body } = require('express-validator');
const productsController = require('../controllers/Products');

const router = express.Router();

router.post("/", 
    [
    body('title').isLength({min:5}).withMessage('minimun title 5 karakter'), 
    body('description').isLength({min:5}).withMessage('minimum konten 5 karakter')
], 
    productsController.upload
);

router.get("/", productsController.allProducts);
router.get("/category/:ctg", productsController.byCategory);
router.get("/category-cari/:ctg", productsController.byCategoryCari);
router.get('/thumb/:pId', productsController.thumb);

router.get("/byId/:id", productsController.byIdProduct);
router.get('/preview/:pId', productsController.preview);

router.delete('/delete/:Did', productsController.dellProduct);
router.put('/', productsController.putProduct);


module.exports = router;
