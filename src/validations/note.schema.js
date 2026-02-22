import z from "zod";

export const paginationQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
});

export const addNoteSchema = z.object({
    title: z.string().trim().min(1, "Title is required")
});

export const updateNoteSchema = z.object({
    title: z.string().trim().min(1, "Title is empty")
});