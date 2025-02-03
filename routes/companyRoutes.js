import express from "express";
import {
    getCompanies,
    deleteCompany,
    updateOneCompany,
    createOneCompany,
    searchCompanyByName,
    getCompaniesSortedByNameASC,
    getCompaniesSortedByNameDESC, searchCompanyById, countCompanies
} from "../controllers/companyController.js";

const router = express.Router();

router.get('/company', getCompanies);
router.get('/countCompanies', countCompanies);
router.get('/searchCompany/:name', searchCompanyByName);
router.get('/ascSortedCompanies/:limit/:offset', getCompaniesSortedByNameASC);
router.get('/descSortedCompanies/:limit/:offset', getCompaniesSortedByNameDESC);
router.get('/company/:id', searchCompanyById);
router.put('/company/:id', updateOneCompany);
router.post('/company', createOneCompany);
router.delete('/company/:id', deleteCompany);

export default router;
