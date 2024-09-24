import {
    HISTORY_SCHEMA,
    LOGIN_FORM_SCHEMA,
    OTP_FORM_SCHEMA,
    SIGNUP_FORM_SCHEMA,
} from "@/schemas";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { EAlertType } from "./constants";

export type TUser = {
    email: string;
};

export type THistorySchema = z.infer<typeof HISTORY_SCHEMA>;
export type TSignupFormSchema = z.infer<typeof SIGNUP_FORM_SCHEMA>;
export type TLoginFormSchema = z.infer<typeof LOGIN_FORM_SCHEMA>;
export type TOTPFormSchema = z.infer<typeof OTP_FORM_SCHEMA>;

export type TErrorResponse = {
    success: false;
    message: string;
    error?: string;
    form_errors?: { path: string; error: string }[];
};

export type TSuccessResponse<TData = undefined> = {
    success: true;
    message: string;
    data: TData;
};

export type TUserLoginResponseData = {
    user: TUser;
};

export type TUserContext = {
    user: TUser;
    setUser: Dispatch<SetStateAction<TUser>>;
};

export type TAlert = {
    id: number;
    type: EAlertType;
    message: string;
    timeout?: number;
};

export type TAlertContext = {
    alerts: TAlert[];
    setAlerts: Dispatch<SetStateAction<TAlert[]>>;
    pushAlert: (_alert: TAlert) => void;
};
