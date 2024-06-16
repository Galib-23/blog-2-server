import { errorThrower } from "../utils/error.js"
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorThrower(401, 'You can only update your own account!'));
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        }, {new: true});

        const { password, ...rest} = updatedUser._doc;

        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}