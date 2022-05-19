import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
    }, process.env.ACCESS_TOKEN_SECRET, { 
        expiresIn: '7d' 
    });
}

export const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

export const authenticateRefreshToken = (refreshToken) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
}

export const generateToken = (user) => {
    return jwt.sign({
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthdate: user.birthdate
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d'
    });
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}