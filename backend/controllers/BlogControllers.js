import Blog from "../models/blog.js";

export const AllBlogs = async (req, res)=>{
    try {
        let blogs =  await Blog.find({});
        let count = await Blog.countDocuments();
        res.status(200).json({message: 'blog is successfully retrived', data : blogs, blogCount: count})
    } catch (error) {
        console.error(error);
        res.json({message: 'blog is not retrived', err: error})
    }
}
export const AddBlog = async (req, res)=>{
    try {
        const {title, subtitle, content} = await req.body;
        console.log(req.body);
        
        const BlogData = await  Blog({title: title, subtitle: subtitle, content: content}).save()
        res.status(200).json({msg:'Data Successfully Stored'});
        if(!BlogData){
            res.status(500).json({err: "Data Wasn't Stored"});
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteBlog = async(req, res)=>{
    try {
        const {blogId, blogTitle} = await req.body;
        if (!blogTitle) {
            return res.json({success: false, message: "Require blog title"})
            
        }
        if (!blogId) {
            return res.json({success: false, message: "Require blog id"})
        }
        await res.json({success: true, message: `" ${blogTitle} " is deleted`} );
            await Blog.deleteOne({_id: blogId});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}