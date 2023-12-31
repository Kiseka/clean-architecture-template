import express from "express"
import cors from "cors";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get('/', async (req, res) => {
    res.send("API")
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

export const startServer = () => {
    const port = 8000
    app.listen(port, () => {
        console.log(`API listening on port ${port}`)
    })
}
