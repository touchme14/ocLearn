const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('OnlineCourses', 'postgres', '221B', {
  host: 'localhost', 
  dialect: 'postgres', 
});

module.exports = { sequelize };