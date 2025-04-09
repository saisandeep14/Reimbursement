const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite will create a file in this location
const dbPath = path.resolve(__dirname, '../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath, 
  logging: false 
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
