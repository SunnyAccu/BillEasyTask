require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// router
const userRouter = require('./Router/userRouter');
const orderRouter = require('./Router/orderRouter');

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/order', orderRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is runing on ${process.env.PORT}`);
    });
  } catch (error) {}
};

start();
