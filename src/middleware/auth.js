import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]

    try {
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("decoded", decoded)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }

}

export default verifyToken