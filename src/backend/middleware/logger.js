
// Simple request logger middleware
function logger(req, res, next) {
  const start = new Date();
  const { method, url } = req;
  
  res.on('finish', () => {
    const end = new Date();
    const duration = end - start;
    const status = res.statusCode;
    
    console.log(`${method} ${url} ${status} - ${duration}ms`);
  });
  
  next();
}

module.exports = logger;
