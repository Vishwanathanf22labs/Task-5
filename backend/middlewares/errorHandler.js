const errorHandler = (err, req, res, next) => {
  console.error(err.stack);


  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  }


  if (err.code === 'ER_DUP_ENTRY') {
    if (err.sqlMessage?.includes('posts.title')) {
      return res.status(400).json({
        message: 'A post with this title already exists'
      });
    }
    return res.status(400).json({
      message: 'Duplicate entry error',
      detail: err.sqlMessage
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }

  if (err.code?.startsWith('ER_')) {
    return res.status(500).json({
      message: 'Database error',
      error: err.message
    });
  }

 
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

 
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
};

export default errorHandler;