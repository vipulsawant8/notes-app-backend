import z from "zod";
import ERRORS from "../constants/errors.js";
import { Types } from "mongoose";

/* ---------- Helpers ---------- */

const objectIdSchema = z.string().refine(
  (val) => Types.ObjectId.isValid(val),
  { message: ERRORS.NOTE_NOT_IDENTIFIED }
);

export const paginationQuerySchema = z.object({
    params: {
        page: z.coerce.number().min(1).default(1)
    }
});

export const addNoteSchema = z.object({
    body:{
        title: z.string().trim().min(1, ERRORS.NOTE_DATA_REQUIRED)
    }
});

export const updateNoteSchema = {
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, { message: ERRORS.NOTE_DATA_REQUIRED }),
  }),
};

export const deleteNoteSchema = {
  params: z.object({
    id: objectIdSchema,
  }),
};

export const pinUnpinNoteSchema = {
  params: z.object({
    id: objectIdSchema,
  }),
    body: z.object({
        status: z.boolean(ERRORS.BAD_REQUEST)
    })
}