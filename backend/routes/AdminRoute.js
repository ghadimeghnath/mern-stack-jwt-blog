
import express from 'express'
import authAdmin from '../middleware/authAdmin.js'
import { AdminLogin, adminLogout, isAdmin } from '../controllers/AdminController.js'

const AdminRouter = express.Router()

AdminRouter.post('/login',AdminLogin);
AdminRouter.get('/is-admin',authAdmin,isAdmin);
AdminRouter.get('/logout',authAdmin,adminLogout);

export default AdminRouter