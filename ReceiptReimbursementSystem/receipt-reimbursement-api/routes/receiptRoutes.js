const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const receiptController = require('../controllers/receiptController');

// Routes
router.get('/', receiptController.getReceipts);
router.get('/:id', receiptController.getReceiptById);
router.post('/', upload.single('receiptFile'), receiptController.createReceipt);
router.put('/:id', receiptController.updateReceipt);
router.delete('/:id', receiptController.deleteReceipt);

module.exports = router;