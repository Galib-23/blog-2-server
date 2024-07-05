import Post from "../models/post.model.js";
import { errorThrower } from "../utils/error.js"

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorThrower(403, "You are not allowed to create a post"));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorThrower(400, "Please provide all the fields"))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
}