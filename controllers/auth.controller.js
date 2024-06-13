import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorThrower } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
    
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            return next(errorThrower(400, 'All fields required'))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();

        const userResponse = savedUser.toObject();
        delete userResponse.password;


        return res.status(200).send(userResponse);
    } catch (error) {
        return next(error);
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password || email === '' || password === ''){
        return next(errorThrower(400, 'All fields required'))
    }
    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorThrower(404, "User not found"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorThrower(400, 'Wrong Credentials'));
        }

        const token = jwt.sign(
            {id: validUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '10d'}
        );

        const { password: _, ...rest } = validUser._doc;

        return res.status(200).cookie('access-token', token, {
            httpOnly: true,
        }).json(rest);


    } catch (error) {
        return next(error);
    }
}