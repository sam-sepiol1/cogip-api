import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});

