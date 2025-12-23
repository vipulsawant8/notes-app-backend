import { Router } from "express";

import { fetchNotes, newNote, updateNote, deleteNote, updatePin } from "../controllers/note.controller.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

const router = Router();

router.use(verifyLogin);

router.get('/', fetchNotes);
router.post('/', newNote);

router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

router.patch('/:id/update-pin', updatePin);

export default router;