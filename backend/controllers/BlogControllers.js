import Blog from "../models/blog.js";

export const AllBlogs = async (req, res)=>{
    try {
        let blogs =  await Blog.find({});
        res.status(200).json({message: 'blog is successfully retrived', data : blogs})
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
        const {blogId} = await req.body;
        if (!blogId) {
            return res.json({success: false, message: "Require BlogId"})
        }
        await res.json({success: true, message: `${blogId} Deleted Successfully`} );
            await Blog.deleteOne({_id: blogId});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}