class ErrorMiddleware {
  static resError(err, _req, res, _next) {
    if (err.message && err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}

module.exports = ErrorMiddleware;