const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const errorStatus = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const UniqueError = require('../errors/unique-err');
require('dotenv').config();

const { JWT_SECRET = 'secret' } = process.env;
const { NODE_ENV = 'dev' } = process.env;
module.exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => res.send(users))
    .catch(next);
};
module.exports.getUsersId = (req, res, next) => {
  Users.findById(req.params.id)
    .orFail(() => new NotFoundError(errorStatus.notFoundUser))
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(errorStatus.castError));
      } else {
        next(err);
      }
    });
};
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.status(201).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorStatus.validationError));
      } else if (err.code === 11000) {
        next(new UniqueError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorStatus.validationError));
      } else {
        next(err);
      }
    });
};
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorStatus.validationError));
      } else {
        next(err);
      }
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send(newUser);
    })
    .catch(next);
};
module.exports.me = (req, res, next) => {
  Users.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};
module.exports.logout = (req, res, next) => {
  Users.findById(req._id)
    .orFail(() => new NotFoundError(errorStatus.notFoundUser))
    .then(() => res.clearCookie('jwt').send({ message: 'Вы разлогинились' }))
    .catch(next);
};
