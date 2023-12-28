const express = require('express');
const app = express();
const bootcampsRouter = require('./routes/bootcamps');

app.use('/api/v1/bootcamps', bootcampsRouter);

app.listen(3000, () => {
  console.log(`the server is listening on port 3000`);
});
