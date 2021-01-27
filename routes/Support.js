const express = require('express');
const supportController = require('../controllers/Support');

const router = express.Router();
//contact
router.post('/contact', supportController.contact);
router.get('/contact', supportController.getContact);
router.delete('/contact/:id', supportController.delContact);
router.put('/contact/', supportController.putContact);

//faq
router.post('/faq', supportController.faq);
router.get('/faq', supportController.getFaq);
router.delete('/faq/:id', supportController.delFaq);
router.put('/faq/', supportController.putFaq);

//slide
router.post('/slide', supportController.slide);
router.get('/slide', supportController.getSlide);
router.delete('/slide/:id', supportController.delSlide);



module.exports = router;

