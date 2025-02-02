import express from "express";
import {
    getCompanies,
    deleteCompany,
    updateOneCompany,
    createOneCompany,
    getOneCompany,
    searchCompany, getDescSortedCompanies, getAscSortedCompanies
} from "../controllers/companyController.js";

const router = express.Router();

router.get('/company', getCompanies);
router.get('/ascSortedCompanies/:limit/:offset', getAscSortedCompanies);
router.get('/searchCompany/:name', searchCompany);
router.get('/descSortedCompanies/:limit/:offset', getDescSortedCompanies);
router.get('/company/:id', getOneCompany);
router.put('/company/:id', updateOneCompany);
router.post('/company', createOneCompany);
router.delete('/company/:id', deleteCompany);

export default router;
