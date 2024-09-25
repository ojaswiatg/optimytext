import { z } from "zod";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_VALIDATION_SCHEMA = z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(64, { message: "Password must not exceed 64 characters." }) // Optional: Define a max length if needed
    .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
    });

const AUTH_FORM_SCHEMA = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .regex(EMAIL_REGEX, "Please enter a valid email")
        .min(7, "Please enter a valid email"),

    password: PASSWORD_VALIDATION_SCHEMA,
    confirmPassword: PASSWORD_VALIDATION_SCHEMA,
});

export const SIGNUP_FORM_SCHEMA = AUTH_FORM_SCHEMA.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    },
);

export const LOGIN_FORM_SCHEMA = AUTH_FORM_SCHEMA.omit({
    confirmPassword: true,
}).merge(
    z.object({
        password: z.string({ required_error: "Password is required" }),
    }),
);

export const OTP_FORM_SCHEMA = z.object({
    otp: z.preprocess(
        (code, ctx) => {
            if (typeof code !== "number") {
                ctx.addIssue({
                    path: ["otp"],
                    message: "A valid verification code is required",
                    code: "invalid_type",
                    expected: "number",
                    received: "string",
                });
            }
        },
        z.number({ required_error: "A valid verification code is required" }),
    ),
});

export const HISTORY_SCHEMA = z.object({
    id: z.string(),
    query: z.string(),
    response: z.string(),
    date: z.number(),
    user_id: z.string(),
});
