import express from "express";
import {
    saveContact,
    fetchContacts,
    updateContact,
    removeContact,
    getSortedContactsByNameDESC, getSortedContactsByNameASC, searchContactByName, countContacts
} from "../controllers/contactController.js";

const router = express.Router();

router.get('/contact', fetchContacts);
router.get('/countContacts', countContacts);
router.get('/searchContact/:name', searchContactByName)
router.get('/sortedAscContacts/:limit/:offset', getSortedContactsByNameASC);
router.get('/sortedDescContacts/:limit/:offset', getSortedContactsByNameDESC);
router.put('/contact/:id', updateContact);
router.post('/contact', saveContact);
router.delete('/contact/:id', removeContact);

export default router;
