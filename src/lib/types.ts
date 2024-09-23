import { z } from "zod";

import {
    HISTORY_SCHEMA,
    LOGIN_FORM_SCHEMA,
    OTP_FORM_SCHEMA,
    SIGNUP_FORM_SCHEMA,
} from "./constants";

export type TUserContext = {
    email: string;
};

export type THistorySchema = z.infer<typeof HISTORY_SCHEMA>;
export type TSignupFormSchema = z.infer<typeof SIGNUP_FORM_SCHEMA>;
export type TLoginFormSchema = z.infer<typeof LOGIN_FORM_SCHEMA>;
export type TOTPFormSchema = z.infer<typeof OTP_FORM_SCHEMA>;
