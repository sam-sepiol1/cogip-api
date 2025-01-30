import express from "express";
import {createOneInvoice, deleteInvoice, getAllInvoices, updateOneInvoice} from "../controllers/invoiceController.js";

const router = express.Router();

router.get('/invoice', getAllInvoices );
router.put('/invoice/:id', updateOneInvoice );
router.post('/invoice', createOneInvoice );
router.delete('/invoice/:id', deleteInvoice );

export default router;