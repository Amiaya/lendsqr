const app = require('./app')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  });


  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
const port = process.env.PORT || 4001
app.listen(port, ()=> {
    console.log(`App running on port ${port} ......`)
})