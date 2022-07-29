import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    let data = { email: user.email };
    if (user.rol) data = { ...data, rol: user.rol };
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { 
        expiresIn: '1h' 
    });
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ 
        email: user.email
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d'
    });
}

// export const authenticateRefreshToken = (refreshToken) => {
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         const accessToken = generateAccessToken({ name: user.name });
//         res.json({ accessToken: accessToken });
//     });
// }

export const generateToken = (payload, time) => {
    return jwt.sign({
        data: payload
    }, process.env.TOKEN_SECRET, {
        expiresIn: time ? time : '7d'
    });
}

export const getTokenData = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if(error) {
            console.log(error); 
            return;
        }
        return decoded;
    });
}

// export const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }