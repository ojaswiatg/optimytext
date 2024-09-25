"use client";

import { verify } from "@/actions/auth";
import { AlertContext } from "@/context/alert";
import { EAlertType } from "@/lib/constants";
import { OTP_FORM_SCHEMA } from "@/lib/schemas";
import { TOTPFormSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export type TVerifyProps = {
    className?: string;
};

export default function Verify({ className }: TVerifyProps) {
    const router = useRouter();
    const { pushAlert } = useContext(AlertContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TOTPFormSchema>({
        resolver: zodResolver(OTP_FORM_SCHEMA),
    });

    async function onSubmit(data: TOTPFormSchema) {
        const response = await verify(data);

        if (response.success) {
            pushAlert({
                id: Date.now(),
                type: EAlertType.SUCCESS,
                message: response.message,
            });
            router.push("/login");
        }

        // set errors from server
        setError("otp", { type: "server", message: "Invalid otp input" });
    }

    return (
        <div className={cn("h-full w-full grid justify-center", className)}>
            <form className="grid gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <label
                        htmlFor="otp"
                        className="input input-bordered flex items-center gap-2"
                    >
                        <div className="i-mdi-key h-4 w-4" />
                        <input
                            {...register("otp")}
                            type="number"
                            name="otp"
                            placeholder="Verification code"
                            disabled={isSubmitting}
                            className="w-64"
                        />
                    </label>
                    {errors.otp ? (
                        <p className="text-sm text-error">
                            {errors.otp.message}
                        </p>
                    ) : null}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary text-white"
                >
                    {isSubmitting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        "Verify"
                    )}
                </button>
            </form>
        </div>
    );
}
