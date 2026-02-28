import { Router } from "express";

import { validate } from "../middlewares/validate/validate.middleware.js";
import { createNoteLimiter, updateNoteLimiter, deleteNoteLimiter, pinUnpinNoteLimiter, burstLimiter } from "../middlewares/limiters/setLimiters.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

import { paginationQuerySchema, addNoteSchema, updateNoteSchema, deleteNoteSchema, pinUnpinNoteSchema } from "../validations/note.schema.js";
import { fetchNotes, newNote, updateNote, deleteNote, updatePin } from "../controllers/note.controller.js";

const router = Router();

router.get('/', verifyLogin, validate(paginationQuerySchema), fetchNotes);
router.post('/', burstLimiter, createNoteLimiter, verifyLogin, validate(addNoteSchema), newNote);

router.patch('/:id', burstLimiter, updateNoteLimiter, verifyLogin, validate(updateNoteSchema), updateNote);
router.delete('/:id', burstLimiter, deleteNoteLimiter, verifyLogin, validate(deleteNoteSchema), deleteNote);

router.patch('/:id/update-pin', burstLimiter, pinUnpinNoteLimiter, verifyLogin, validate(pinUnpinNoteSchema), updatePin);

export default router;