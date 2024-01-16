const jwt = require('jsonwebtoken');
const TokenError = require('../errors/token-err');

const { JWT_SECRET } = process.env;
const { NODE_ENV = 'dev' } = process.env;
module.exports = (req, res, next) => {
  const { method } = req;
  if (method !== 'OPTIONS') {
    const { jwt: token } = req.cookies;
    if (!token) {
      throw new TokenError('Необходима авторизация');
    }
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch {
      next(new TokenError('Необходима авторизация'));
    }
    req.user = payload;
  }
  return next();
};
