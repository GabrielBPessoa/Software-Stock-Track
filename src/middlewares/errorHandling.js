class ErrorHandling {
  async handleError(error, req, res, next) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

export { ErrorHandling };
