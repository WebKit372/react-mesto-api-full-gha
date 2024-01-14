const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorCatcher = require('./middlewares/errorCatcher');
const NotFoundError = require('./errors/not-found-err');
const { signupValidation, signinValidation } = require('./utils/validationConfig');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
require('dotenv').config();

const app = express();
const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_PATH);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);
app.use(auth);

app.use('/', require('./routes'));

app.use('/*', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  return next(new NotFoundError('Некорректный путь'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorCatcher);
app.listen(PORT, () => {
});
