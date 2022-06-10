import redisClient from "../config/redis";

const rateLimiter = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const [response] = await redisClient.multi().incr(ip).exec();
    if (response[1] === 1) await redisClient.expire(ip, 60);
    if (response[1] === 100) await redisClient.expire(ip, 60);
    if (response[1] >= 100) {
        return res.status(429).json({ error: {
            status: 429,
            message: "Too many requests, try again later"
        } });
    }
    next();
}

export default rateLimiter;