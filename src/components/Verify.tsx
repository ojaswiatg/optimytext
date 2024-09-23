"use client";

import { TOTPFormSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { OTP_FORM_SCHEMA } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type TLoginProps = {
    switchToSignupTab: () => void;
    className?: string;
};

export default function Signup({ className }: TLoginProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TOTPFormSchema>({
        resolver: zodResolver(OTP_FORM_SCHEMA),
    });

    async function onSubmit(data: TOTPFormSchema) {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("SUCCESS", data);

        // set errors from server
        setError("otp", { type: "server", message: "Invalid otp input" });
    }

    return (
        <div className={cn("h-full w-full grid justify-center", className)}>
            <form className="grid gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <label
                        htmlFor="name"
                        className="input input-bordered flex items-center gap-2"
                    >
                        <div className="i-mdi-key h-4 w-4" />
                        <input
                            {...register("otp")}
                            type="text"
                            name="email"
                            placeholder="Email"
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
