import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authentificationRoutes from './routes/authentificationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import contactRoutes from "./routes/contactRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";

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

app.use('/api', userRoutes);
app.use('/api', authentificationRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', companyRoutes);
app.use('/api', contactRoutes);
app.use('/api', rolesRoutes);