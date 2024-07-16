const { Router } = require('express');
const {
    handleCreateNewUser,
    handleLogin,
    handleGetAllUsers, 
    handleGetUserById,
} = require('../controllers/user');


const router = Router();

router.post('/signup', handleCreateNewUser);
router.post('/login', handleLogin);
router.get('/all', handleGetAllUsers);
router.get('/:id', handleGetUserById);


module.exports = router;

