import userModel from "../models/userModel.js";


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already Exist!" });
        };

        newUser = new userModel.create({
            username,
            email,
            password
        })

        await newUser.save();

        res.status(200).json({
            message: "user Created Successfully",
            user: newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" })
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find the user
        const userExist = await userModel.findOne({ email })
        if (!userExist) {
            return res.status(404).json({ message: "User not Found! invalid email" })
        };

        // validate password
        const isValidePassword = await userExist.isValidPassword(password);
        if (!isValidePassword) {
            return res.status(401).json({ message: "Invalid Credintials!" })
        };

        // return refresh token
        res.status(201).json({
            message:"User logged in successfully.",
            refreshToken:userExist.refreshToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}


export {
    registerUser,
};