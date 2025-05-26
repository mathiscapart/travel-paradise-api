import express from 'express';
import {userRouter} from "./routes/user.routes.js";
const app = express()
app.use(express.json())

const port = 8000

app.use("/users", userRouter)

async function init(){
    app.listen(port)
}

init();
