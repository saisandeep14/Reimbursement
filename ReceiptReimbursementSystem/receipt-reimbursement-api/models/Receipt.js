const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Receipt = sequelize.define('Receipt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 500]
    }
  },
  receiptFileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  receiptFilePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employeeId: {
    type: DataTypes.STRING,
    defaultValue: 'Unknown'
  },
  submissionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = Receipt;