import Blog from "../models/blog.js";
import {v2 as cloudinary} from 'cloudinary';

export const AllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({});
    let count = await Blog.countDocuments();
    res.status(200).json({
      message: "blog is successfully retrived",
      data: blogs,
      blogCount: count,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "blog is not retrived", err: error });
  }
};

export const blogById = async (req, res) => {
  try {
    const { id } = await req.body;

    if (!id) {
      return res.json({ success: false, message: "Blog id required" });
    }
    const blog = await Blog.findById({ _id: id });

    if (!blog) {
      return res.json({ success: false, message: "Blog does not exits" });
    }
    res.json({ success: true, blog: blog });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const AddBlog = async (req, res) => {
  try {
    const { title, subtitle, content } = await req.body;
    const imageUrl = req.file.path;
    const imagePublicId = req.file.filename;


    if (!title || !subtitle || !content) {
      return res.json({ success: false, message: "Missing detail" });
    }
    const BlogData = await Blog.create({
      title: title,
      subtitle: subtitle,
      content: content,
      img_url: imageUrl,
      imagePublicId : imagePublicId,
    });
    await BlogData.save();
    res.status(200).json({ success: true, message: "Blog Created" });
    if (!BlogData) {
      return res.json({ success: false, message: "Blog isn't created" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId, blogTitle } = await req.body;

    if (!blogId) {
      return res.json({ success: false, message: "Require blog id" });
    }
    await res.json({ success: true, message: `" ${blogTitle} " is deleted` });
    await Blog.deleteOne({ _id: blogId });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { id, title, subtitle, content } = await req.body;

    if (!id) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const blog = await Blog.findOne({ _id: id })

    const imageUrl = req.file? req.file.path : blog.img_url;
    // get the image name to delete before image
    const imagePublicId = req.file? req.file.filename : blog.imagePublicId;
    
    // delete the before image 
    if (blog.imagePublicId){
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }
    const updatedBlog = await blog.updateOne({
      title: title,
      subtitle: subtitle,
      content: content,
      img_url: imageUrl || blog.img_url,
      imagePublicId: imagePublicId || blog.imagePublicId,
    });
    if (updatedBlog) {
      return res.json({
        success: true,
        message: `Blog " ${title} " is Updated`,
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
