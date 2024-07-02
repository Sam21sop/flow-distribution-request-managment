import jwt from 'jsonwebtoken';


const isAuthrized = async (req, res, next) => {
    let token;
    try {
        token = req.header('Authorization');
        if (!token) {
            res.status(404).json({ message: "No token Available, Authorization denied!" });
        };

        const decode = await jwt.verify(token, 'yourjwt_secrete_key');
        req.user = decode.user;
        next()
    } catch (error) {
        res.status(401).json({ message: "Token is not valid !" })
    }
};

export {
    isAuthrized,
};