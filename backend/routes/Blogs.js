import express from 'express'
import { AddBlog, AllBlogs } from '../controllers/BlogControllers.js';
import authAdmin from '../middleware/authAdmin.js';

let router = express.Router();

router.get('/api/allblogs',AllBlogs);
router.post('/api/blogs/addBlogs',authAdmin,AddBlog)

export default router