const ErrorResponse = require('./../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  //   console.log(err.name);
  //   console.log(err.code);

  console.log(err.name);

  //   Mongoose bad ObjectID
  if (err.name === 'CastError') {
    const message = `Resource not found with id ${err.value} `;
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  //   Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((error) => error.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
