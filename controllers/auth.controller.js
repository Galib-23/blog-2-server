import User from "../models/user.model.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const newUser = new User({
            username,
            email,
            password
        });
        const savedUser = await newUser.save(); 
        return res.status(200).send(savedUser);
    } catch (error) {
        console.log("Error in signup: ", error);
        return res.status(500).json(error.errorResponse.errmsg);
    }
}