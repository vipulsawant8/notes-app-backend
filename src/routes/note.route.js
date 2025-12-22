import { Router } from "express";

import { fetchNotes, newNote, updateNote, deleteNote } from "../controllers/note.controller.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

const router = Router();

router.use(verifyLogin);

router.get('/', fetchNotes);
router.post('/', newNote);

router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;