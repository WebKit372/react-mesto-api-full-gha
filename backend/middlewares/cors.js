const allowedCors = [
  'localhost:3000',
  'https://api.webkit15pr.nomoredomainsmonster.ru',
  'http://api.webkit15pr.nomoredomainsmonster.ru',
  'http://localhost:3000',
  'https://localhost:3000',
];
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', requestHeaders);
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      return res.end();
    }
  }
  else {
    res.send({ message: 'Привет' });
  }
  return next();
};
