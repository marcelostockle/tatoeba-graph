require('dotenv').config()
require('express-async-errors')
const path = require('path')
const connectDB = require('./db/connect')
const PORT = process.env.PORT || 3001;

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static('../public'));

// routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/api-home.html'))
})
const api_router = require('./routes/api-router')
app.use('/api/sentence', api_router)

// route not found and error handling
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
    try {
      // connectDB
      await connectDB(process.env.MONGODB_URI);
      app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
    } catch (error) {
      console.log(error);
    }
  };
  
  start();