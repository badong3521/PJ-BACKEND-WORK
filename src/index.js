import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import verifyToken from "./middleware/auth.js"
import morgan from "morgan"
import bodyParser from "body-parser"

const app = express();
const PORT = process.env.PORT || 8000
dotenv.config()

const UsersPost = [{
        id: 1,
        name: 'REACTPost',
    },
    {
        id: 2,
        name: 'JavaScriptPost',
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

// SET HEADERS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/test", verifyToken, (req, res) => {

    const userPost = UsersPost.filter(userP => userP.id === req.userId)
    return res.json({
        userPost
    })
})

//LISTEN SERVER 
app.listen(PORT, () => {
    console.log(`listening on port ${PORT} Successful`)
})