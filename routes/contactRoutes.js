import express from "express";
import {
    saveContact,
    fetchContacts,
    updateContact,
    removeContact,
    searchContact,
    sortedAscContacts, sortedDescContacts
} from "../controllers/contactController.js";

const router = express.Router();

router.get('/contact', fetchContacts);
router.get('/searchContact/:name', searchContact)
router.get('/sortAscContacts/:limit/:offset', sortedAscContacts);
router.get('/sortDescContacts/:limit/:offset', sortedDescContacts);

router.put('/contact/:id', updateContact);
router.post('/contact', saveContact);
router.delete('/contact/:id', removeContact);

export default router;
