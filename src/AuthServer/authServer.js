import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import generatesToken from "../utils/generatesToken.js"

const app = express();
const PORT = process.env.PORT_AUTH || 6000
dotenv.config()

var Users = [{
        id: 1,
        name: 'REACT',
        refreshToken: null
    },
    {
        id: 2,
        name: 'JavaScript',
        refreshToken: null
    }
]


//CHECK OBJECT TO SEVER IS OBJECT JSON
app.use(express.json());

// CHECK OBJECT TO SEVER IS OBJECT STRING OR ARRAY
app.use(express.urlencoded({
    extended: true
}))

//CORE CHECK BROWSERS
app.use(cors({
    origin: true
}))

//LOGGER MORGAN
app.use(morgan("combined"));

const RefreshTokens = (nameUser, refreshToken) => {
    Users = Users.map(user => {
        if (user.name === nameUser) {
            return {
                ...user,
                refreshToken
            }
        } else {
            return Users
        }
    })
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/login", (req, res) => {
    const user = req.body.user
    const nameUser = Users.find(object => {
        return object.name === user
    })
    if (!nameUser) res.sendStatus(401)
    const token = generatesToken(nameUser)
    console.log("token.refreshToken", token.refreshToken)
    RefreshTokens(nameUser, token.refreshToken)
    console.log("Users", Users)

    return res.json(token)
})

//LISTEN SERVER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT} Successful`)
})