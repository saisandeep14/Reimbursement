const Receipt = require('../models/Receipt');
const fs = require('fs');

// Get all receipts
exports.getReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.findAll({
      order: [['submissionDate', 'DESC']]
    });
    res.status(200).json(receipts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single receipt
exports.getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findByPk(req.params.id);
    
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    
    res.status(200).json(receipt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new receipt
exports.createReceipt = async (req, res) => {
  try {
    const { purchaseDate, amount, description, employeeId } = req.body;
    
    if (!purchaseDate || !amount || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a receipt file' });
    }
    
    const newReceipt = await Receipt.create({
      purchaseDate,
      amount,
      description,
      receiptFileName: req.file.originalname,
      receiptFilePath: req.file.path,
      employeeId: employeeId || 'Unknown'
    });
    
    res.status(201).json(newReceipt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a receipt
exports.updateReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findByPk(req.params.id);
    
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    
    await receipt.update(req.body);
    
    const updatedReceipt = await Receipt.findByPk(req.params.id);
    res.status(200).json(updatedReceipt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a receipt
exports.deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findByPk(req.params.id);
    
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    
    // Delete file from server
    if (receipt.receiptFilePath) {
      fs.unlink(receipt.receiptFilePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    
    await receipt.destroy();
    
    res.status(200).json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};