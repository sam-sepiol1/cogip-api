import express from 'express';
import dotenv from 'dotenv';
import companyRoutes from './routes/companyRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';

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

//app.use('/api', userRoutes);
//app.use('/api', authenticationRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', companyRoutes);
