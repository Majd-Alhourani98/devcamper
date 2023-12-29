const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const errorHandler = require('./middleware/error');
const bootcampsRouter = require('./routes/bootcamps');

dotenv.config({ path: './config/config.env' });
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/bootcamps', bootcampsRouter);
app.use(errorHandler);

const server = app.listen(3000, () => {
  console.log(`the server is listening on port 3000`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server
  server.close(() => process.exit());
});
