import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://www.blogtyrant.com/wp-content/uploads/2020/02/how-long-should-a-blog-post-be.png',
    }, 
    category: {
        type: String,
        default: "uncategorized",
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;