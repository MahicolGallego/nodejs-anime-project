const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  //error -> .message, y otros
  res.status(500).json({"error": err.message, "message": "ocurrio un error"})
}

export default errorHandler;