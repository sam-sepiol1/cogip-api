import express from "express";
import { saveContact, fetchContacts, updateContact, removeContact } from "../controllers/contactController.js";

const router = express.Router();

router.get('/contact', fetchContacts);
router.put('/contact/:id', updateContact);
router.post('/contact', saveContact);
router.delete('/contact/:id', removeContact);

export default router;