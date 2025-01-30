import express from "express";
import { getCompanies, deleteCompany, updateCompanies, createCompanies } from "../controllers/companyController.js";

const router = express.Router();

router.get('/company', getCompanies);
router.put('/company/:id', updateCompanies);
router.post('/company', createCompanies);
router.delete('/company/:id', deleteCompany);

export default router;