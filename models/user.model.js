import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username must be unique"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email already in use"],
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;