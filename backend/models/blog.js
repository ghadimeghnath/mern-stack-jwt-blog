import mongoose, { model } from 'mongoose'

const BlogSchema = mongoose.Schema({
    title :{
        type: String,
        required : true,
    },
    subtitle:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    img_url:{
        type: String,
        required: true,
    },
    imagePublicId: {
        type: String,
        required: true,
    }
})

const Blog = new mongoose.model('Blog', BlogSchema);

export default Blog;