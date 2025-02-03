import express from "express";
import {
    createOneInvoice,
    deleteInvoice,
    getAllInvoices,
    updateOneInvoice,
    getOneInvoice,
    getPaginatedSortedInvoices, sortAscDueDateInvoices, sortDescDueDateInvoices
} from "../controllers/invoiceController.js";
import {countAllInvoices} from "../models/invoiceModel.js";

const router = express.Router();

router.get('/invoice', getAllInvoices );
router.get('/countInvoices', countAllInvoices);
router.get('/paginatedInvoices/:limit/:offset', getPaginatedSortedInvoices);
router.get('/sortAscDueDate/:limit/:offset', sortAscDueDateInvoices)
router.get('/sortDescDueDate/:limit/:offset', sortDescDueDateInvoices)
router.get('/invoice/:id', getOneInvoice);
router.put('/invoice/:id', updateOneInvoice );
router.post('/invoice', createOneInvoice );
router.delete('/invoice/:id', deleteInvoice );

export default router;
