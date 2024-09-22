import { z } from "zod";

export const HistorySchema = z.object({
    id: z.string(),
    message: z.string(),
    role: z.string(),
    date: z.number(),
    user_id: z.string(),
});
