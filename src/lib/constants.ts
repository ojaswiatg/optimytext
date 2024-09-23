import { z } from "zod";

export enum EDataTheme {
    CORPORATE = "corporate",
    BUSINESS = "business",
}

export enum ETextTones {
    PROFESSIONAL = "professional",
    CASUAL = "casual",
    FRIENDLY = "friendly",
    ACADEMIC = "academic",
    FUNNY = "funny",
    INTERESTING = "interesting",
    CURIOUS = "curious",
    SURPRISE = "surprise",
}

export const TEXT_TONES: { id: ETextTones; text: string; emoji: string }[] = [
    { id: ETextTones.PROFESSIONAL, text: "Professional", emoji: "💼" },
    { id: ETextTones.CASUAL, text: "Casual", emoji: "✍️" },
    { id: ETextTones.FRIENDLY, text: "Friendly", emoji: "🤝" },
    { id: ETextTones.ACADEMIC, text: "Academic", emoji: "🎓" },
    { id: ETextTones.FUNNY, text: "Funny", emoji: "😆" },
    { id: ETextTones.INTERESTING, text: "Interesting", emoji: "🤔" },
    { id: ETextTones.CURIOUS, text: "Curious", emoji: "🧐" },
    { id: ETextTones.SURPRISE, text: "Surprise Me!", emoji: "🎁" },
];

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
});

export const OTP_FORM_SCHEMA = z.object({
    otp: z.number(),
});

export const HISTORY_SCHEMA = z.object({
    id: z.string(),
    message: z.string(),
    role: z.string(),
    date: z.number(),
    user_id: z.string(),
});

export enum EAuthTabs {
    LOGIN,
    SIGNUP,
}
