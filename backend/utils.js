import jwt, { decode } from 'jsonwebtoken';

export const generateToken = (user) => {
    const jwtSecret = process.env.JWT_SECRET || 'amazona';
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, jwtSecret, {
        expiresIn: '30d',
    })
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    const jwtSecret = process.env.JWT_SECRET || 'amazona';

    if (authorization) {
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, jwtSecret, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' })
            } else {
                req.user = decode
                next()
            }
        })
    } else {
        res.status(401).send({ message: 'No Token' })
    }
}