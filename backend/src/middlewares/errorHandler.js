const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error";

  // Handle different types of errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log error for debugging
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    statusCode: statusCode,
  });

  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = errorHandler;
