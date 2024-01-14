const allowedCors = [
  'localhost:3000',
  'https://api.webkit15pr.nomoredomainsmonster.ru',
  'http://api.webkit15pr.nomoredomainsmonster.ru',
  'http://localhost:3000/',
  'https://localhost:3000',
];
module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', requestHeaders);
      return res.end();
    }
  }
  return next();
};
