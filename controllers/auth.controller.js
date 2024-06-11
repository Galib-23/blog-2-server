import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorThrower } from "../utils/error.js";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
    
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            next(errorThrower(400, 'All fields required'))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save(); 
        return res.status(200).send(savedUser);
    } catch (error) {
        next(error);
    }
}