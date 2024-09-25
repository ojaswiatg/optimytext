import mongoConnect from "@/connections/mongo";
import { EOTPOperation } from "@/lib/constants";
import OTPModel from "@/models/OTPModel";
import { isEmpty } from "lodash-es";

async function canGenerateOTP(email: string) {
    try {
        const otpDoc = await OTPModel.findOne({ email });
        if (isEmpty(otpDoc)) {
            // if OTP does not exist then we return true
            return true;
        }

        const ONE_MINUTE = 60 * 1000;
        const currTime = new Date().getTime() / 1000;
        const prevTime = otpDoc.createdOn;

        if (currTime && prevTime && currTime - prevTime >= ONE_MINUTE) {
            await OTPModel.deleteOne({ email });
            return true;
        }

        return false;
    } catch (error) {
        console.error("helper/otp: canUserSendOTP");
        console.error(
            `Failed to check if user can send OTP. Email id: ${email}`,
        );
        console.error(error);
        return false;
    }
}

type TGenerateNewOTPParams = {
    email: string;
    name?: string;
    operation: EOTPOperation;
    password?: string;
};

export async function generateOTP(params: TGenerateNewOTPParams) {
    await mongoConnect();
    try {
        const canSendOTP = await canGenerateOTP(params.email);
        if (!canSendOTP) {
            return null;
        }

        // delete previously created otp if it is there for the user
        await OTPModel.deleteOne({ email: params.email });

        // Keep finding unique OTP until it is found but with a certain timelimit
        const endTime = Date.now() + 30 * 1000; // Run this loop for max of 30 seconds only
        let otp, otpFound;

        do {
            const currTime = Date.now();
            if (currTime > endTime) {
                throw new Error(
                    "Cannot generate unique OTP: time limit exceeded",
                );
            }

            otp = Math.floor(100000 + Math.random() * 900000);
            otpFound = await OTPModel.findOne({ otp });
        } while (!isEmpty(otpFound));

        // create new otp
        const createdOTP = await OTPModel.create({
            otp,
            ...params,
        });
        return createdOTP.otp;
    } catch (error) {
        console.error("helper/otp: generateNewOTPForEmail");
        console.error(`Failed to generate new OTP. Email id: ${params.email}`);
        console.error(error);
        return null;
    }
}
