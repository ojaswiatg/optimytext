import clsx, { ClassValue } from "clsx";
import { map } from "lodash-es";
import { twMerge } from "tailwind-merge";
import type { ZodError } from "zod";

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export function getFormattedZodErrors(errors: ZodError) {
    const formattedErrors = map(errors.issues, (issue) => {
        return {
            path: issue.path[0],
            message: issue.message,
        };
    });
    return formattedErrors;
}
