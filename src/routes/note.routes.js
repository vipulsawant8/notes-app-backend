import { Router } from "express";

import { validate } from "../middlewares/validate/validate.middleware.js";
import { createNoteLimiter, updateNoteLimiter, deleteNoteLimiter, pinUnpinNoteLimiter, burstLimiter } from "../middlewares/limiters/setLimiters.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

import { paginationQuerySchema, addNoteSchema, updateNoteSchema, deleteNoteSchema, pinUnpinNoteSchema } from "../validations/note.schema.js";
import { fetchNotes, newNote, updateNote, deleteNote, updatePin } from "../controllers/note.controller.js";

const router = Router();

router.get('/', verifyLogin, burstLimiter, validate(paginationQuerySchema), fetchNotes);
router.post('/', verifyLogin, burstLimiter, createNoteLimiter, validate(addNoteSchema), newNote);

router.patch('/:id', verifyLogin, burstLimiter, updateNoteLimiter, validate(updateNoteSchema), updateNote);
router.delete('/:id', verifyLogin, burstLimiter, deleteNoteLimiter, validate(deleteNoteSchema), deleteNote);

router.patch('/:id/update-pin', verifyLogin, burstLimiter, pinUnpinNoteLimiter, validate(pinUnpinNoteSchema), updatePin);

export default router;