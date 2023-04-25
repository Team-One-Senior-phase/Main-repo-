const express = require('express')
const cors = require('cors');
const users = require('./Routes/user.js');
const products = require('./Routes/product.js')
const sequelize = require('./ORM/index.js');

const app = express()
// Middleware
app.use(express.json()); 
app.use(cors());

const port = 3000

// Use the routes 
app.use('/api/users', users);
app.use('/api/products', products);
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error(error);
  });