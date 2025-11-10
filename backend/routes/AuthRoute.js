import express from 'express';
import { isAuth, login, logout, register } from '../controllers/AuthController.js';
import AuthUser from '../middleware/authUser.js';

const AuthRouter =  express.Router();

AuthRouter.post('/register',register);
AuthRouter.post('/login',login);
AuthRouter.get('/is-auth',AuthUser,isAuth);
AuthRouter.get('/logout',AuthUser,logout);


export default AuthRouter