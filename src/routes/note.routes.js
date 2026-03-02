import { Router } from "express";

import { validate } from "../middlewares/validate/validate.middleware.js";
import { createNoteLimiter, updateNoteLimiter, deleteNoteLimiter, pinUnpinNoteLimiter, burstLimiter } from "../middlewares/limiters/setLimiters.js";
import verifyLogin from "../middlewares/auth/verifyLogin.js";

import { paginationQuerySchema, addNoteSchema, updateNoteSchema, deleteNoteSchema, pinUnpinNoteSchema } from "../validations/note.schema.js";
import { fetchNotes, newNote, updateNote, deleteNote, updatePin } from "../controllers/note.controller.js";

const router = Router();

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Fetch paginated notes for logged-in user
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Notes fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyLogin, burstLimiter, validate(paginationQuerySchema), fetchNotes);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Validation error or duplicate title
 */
router.post('/', verifyLogin, burstLimiter, createNoteLimiter, validate(addNoteSchema), newNote);

/**
 * @swagger
 * /notes/{id}:
 *   patch:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 */
router.patch('/:id', verifyLogin, burstLimiter, updateNoteLimiter, validate(updateNoteSchema), updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 */
router.delete('/:id', verifyLogin, burstLimiter, deleteNoteLimiter, validate(deleteNoteSchema), deleteNote);

/**
 * @swagger
 * /notes/{id}/update-pin:
 *   patch:
 *     summary: Pin or unpin a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Pin status updated
 *       400:
 *         description: Pin limit exceeded
 */
router.patch('/:id/update-pin', verifyLogin, burstLimiter, pinUnpinNoteLimiter, validate(pinUnpinNoteSchema), updatePin);

export default router;