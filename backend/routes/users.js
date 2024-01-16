const router = require('express').Router();
const {
  getUsers,
  getUsersId,
  updateUser,
  updateUserAvatar,
  me,
  logout,
} = require('../controllers/users');
const { userIdValidation, userInfoValidation, userAvatarValidation } = require('../utils/validationConfig');

router.get('/', getUsers);
router.get('/me', me);
router.get('/:id', userIdValidation, getUsersId);
router.patch('/me', userInfoValidation, updateUser);
router.patch('/me/avatar', userAvatarValidation, updateUserAvatar);
router.get('/log-out', userIdValidation, logout);
module.exports = router;
