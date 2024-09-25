"use server";

import mongoConnect from "@/connections/mongo";
import { sendMail } from "@/helpers/mail";
import { generateOTP } from "@/helpers/otp";
import { addUserToDB } from "@/helpers/user";
import { EOTPOperation } from "@/lib/constants";
import {
    LOGIN_FORM_SCHEMA,
    OTP_FORM_SCHEMA,
    SIGNUP_FORM_SCHEMA,
} from "@/lib/schemas";
import {
    TLoginFormSchema,
    TOTPFormSchema,
    TSignupFormSchema,
} from "@/lib/types";
import { getFormattedZodErrors } from "@/lib/utils";
import OTPModel from "@/models/OTPModel";
import { isEmpty } from "lodash-es";
import { revalidatePath } from "next/cache";

export async function login(creds: TLoginFormSchema) {
    const validation = LOGIN_FORM_SCHEMA.safeParse(creds);
    if (!validation.success) {
        return {
            success: false,
            message: "Failed to sign up",
            form_errors: getFormattedZodErrors(validation.error),
        };
    }

    // const supabase = createSupabaseServerClient();

    // const data = {
    //     email: creds.email,
    //     password: creds.password,
    // };

    // const { error } = await supabase.auth.signInWithPassword(data);

    // if (error) {
    //     return {
    //         success: false,
    //         message: "Failed to log in",
    //         error: error.message,
    //     };
    // }

    revalidatePath("/", "layout");

    return {
        success: true,
        message: "User logged in successfully",
        data: {
            user: {
                email: creds.email,
            },
        },
    };
}

export async function signup(creds: TSignupFormSchema) {
    await mongoConnect();

    const validation = SIGNUP_FORM_SCHEMA.safeParse(creds);
    if (!validation.success) {
        return {
            success: false,
            message: "Failed to sign up",
            form_errors: getFormattedZodErrors(validation.error),
        };
    }

    const otp = await generateOTP({
        email: creds.email,
        password: creds.password,
        operation: EOTPOperation.SIGNUP,
    });

    // if we couldn't generate the otp
    if (!otp) {
        return {
            success: false,
            error: "OTP already requested",
            message: "Please wait for some time before requesting a new OTP",
        };
    }

    sendMail({
        emailTo: creds.email,
        subject: "Verify your Tonely account",
        message: `Enter the verification code ${otp} to verify your account. DO NOT share this verification code with anyone.`,
        methodName: "auth/signup",
    });

    return {
        success: true,
        message:
            "Verification code sent! Please check your email inbox and spam folders",
    };
}

export async function verify(creds: TOTPFormSchema) {
    await mongoConnect();

    const validation = OTP_FORM_SCHEMA.safeParse(creds);
    if (!validation.success) {
        return {
            success: false,
            message: "Failed to sign up",
            form_errors: getFormattedZodErrors(validation.error),
        };
    }

    try {
        const otp = await OTPModel.findOne({ otp: creds.otp });

        if (isEmpty(otp)) {
            return {
                success: false,
                message: "Invalid OTP, please generate a new OTP",
                error: "OTP lookup failed",
            };
        }

        switch (otp.operation) {
            case EOTPOperation.SIGNUP:
                const result = await addUserToDB({
                    email: otp.email,
                    password: otp.password,
                });
                return result;
            default:
                return {
                    success: false,
                    error: "Invalid operation",
                    message: "Invalid operation! Please try again",
                };
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Unknown error occured",
            error: "Internal server error",
        };
    }
}
