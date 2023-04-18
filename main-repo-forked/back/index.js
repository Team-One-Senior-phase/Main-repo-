const express = require('express')
const cors = require('cors');
const users = require('./Routes/user.js');
const sequelize = require('./ORM/index.js');

const app = express()
// Middleware
app.use(express.json()); 
app.use(cors());

const port = 3000

// Use the users route
app.use('/api/users', users);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error(error);
  });