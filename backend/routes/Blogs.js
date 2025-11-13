import express from 'express'
import { AddBlog, AllBlogs, blogById, deleteBlog, updateBlogById } from '../controllers/BlogControllers.js';
import authAdmin from '../middleware/authAdmin.js';

let router = express.Router();

router.get('/api/allblogs',AllBlogs);
router.post('/api/blogs/addBlogs',authAdmin,AddBlog)
router.post('/api/blogs/deleteBlog',authAdmin,deleteBlog)
router.post('/api/blogs/blogbyid',authAdmin,blogById)
router.post('/api/blogs/updatebyid',authAdmin,updateBlogById)

export default router