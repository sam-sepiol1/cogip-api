import express from "express";
import {
    getCompanies,
    deleteCompany,
    updateOneCompany,
    createOneCompany,
    getOneCompany,
    getPaginatedSortedCompanies
} from "../controllers/companyController.js";

const router = express.Router();

router.get('/company', getCompanies);
router.get('/paginatedCompanies/:limit/:offset', getPaginatedSortedCompanies);
router.get('/company/:id', getOneCompany);
router.put('/company/:id', updateOneCompany);
router.post('/company', createOneCompany);
router.delete('/company/:id', deleteCompany);

export default router;
