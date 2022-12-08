import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const generatesToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "40s"
    })
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
        expiresIn: "1h"
    })
    const token = {
        accessToken,
        refreshToken
    }
    return token
}

export default generatesToken