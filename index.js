import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authentificationRoutes from './routes/authentificationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import contactRoutes from "./routes/contactRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";
import permissionsRoutes from "./routes/permissionsRoutes.js";
import { authenticate } from "./controllers/authentificationController.js";

const app = express();
app.use(cors());

dotenv.config();
app.use(express.json());

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});

app.use('/api', authentificationRoutes);
app.use('/api', authenticate, userRoutes);
app.use('/api', authenticate, permissionsRoutes);
app.use('/api', authenticate, invoiceRoutes);
app.use('/api', authenticate, companyRoutes);
app.use('/api', authenticate, contactRoutes);
app.use('/api', authenticate, rolesRoutes);
