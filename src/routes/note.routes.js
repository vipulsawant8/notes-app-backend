import { Router } from "express";
import verifyLogin from "../middlewares/auth/verifyLogin.js";
import { validate } from "../middlewares/validate/validate.middleware.js";
import { paginationQuerySchema, addNoteSchema, updateNoteSchema } from "../validations/note.schema.js";
import { objectIdParamSchema } from "../validations/auth.schema.js";
import { fetchNotes, newNote, updateNote, deleteNote, updatePin } from "../controllers/note.controller.js";

const router = Router();

router.use(verifyLogin);

router.get('/', validate({ params: paginationQuerySchema }), fetchNotes);
router.post('/', validate({ body: addNoteSchema }), newNote);

router.patch('/:id', validate({ params: objectIdParamSchema, body: updateNoteSchema }), updateNote);
router.delete('/:id', validate({ params: objectIdParamSchema }), deleteNote);

router.patch('/:id/update-pin', validate({ params: objectIdParamSchema }), updatePin);

export default router;