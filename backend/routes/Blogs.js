import express from 'express'
import { AddBlog, AllBlogs, deleteBlog } from '../controllers/BlogControllers.js';
import authAdmin from '../middleware/authAdmin.js';

let router = express.Router();

router.get('/api/allblogs',AllBlogs);
router.post('/api/blogs/addBlogs',authAdmin,AddBlog)
router.post('/api/blogs/deleteBlog',authAdmin,deleteBlog)

export default router