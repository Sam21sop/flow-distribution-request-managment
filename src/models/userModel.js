import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import processEnvVar from '../utils/processEnvVar.js';

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


// hash password before saving in database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    };

    this.password = await bcrypt.hash('secreteTokenfromenvirnment', 10);
    next()
});

// chech whether password is valid or not
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// generate and store refresh token ans access token
userModel.methods.generateAccessToken = async function () {
    const accesToken = await jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username 
        },
        processEnvVar.ACCESS_TOKEN_SECRETE,
        {
            expiresIn: processEnvVar.ACCESS_TOKEN_EXPIRY
        }
    );
    return accesToken;
};


userSchema.methods.generateRefreshToken = async function () {
    const refreshToken = await jwt.sign(
        {
            _id:this._id
        },
        processEnvVar.REFRESH_TOKEN_SECRETE,
        {
            expiresIn: processEnvVar.REFRESH_TOKEN_EXPIRY
        }

    );

    return refreshToken;
};



const userModel = mongoose.model('User', userSchema);
export default userModel;