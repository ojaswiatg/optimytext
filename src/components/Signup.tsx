"use client";

import { cn } from "@/lib/utils";
import { FormEvent, useState } from "react";

export type TSignupProps = {
    className?: string;
};

export default function Signup({ className }: TSignupProps) {
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Form submitted...");
    }

    function signupWithGoogle() {
        console.log("Signed up with google");
    }

    function signupWithGithub() {
        console.log("Signed up with github");
    }

    return (
        <div className={cn("h-full w-full grid justify-center", className)}>
            <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
                <label
                    htmlFor="name"
                    className="input input-bordered flex items-center gap-2"
                >
                    <div className="i-mdi-email h-4 w-4" />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="w-64"
                    />
                </label>
                <label
                    htmlFor="password"
                    className="input input-bordered flex items-center gap-2"
                >
                    <div className="i-mdi-key-variant h-4 w-4" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-64"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <div
                            className={cn(
                                {
                                    "i-mdi-eye": !showPassword,
                                    "i-mdi-eye-off": showPassword,
                                },
                                "h-4 w-4",
                            )}
                        />
                    </button>
                </label>
                <label
                    htmlFor="confirmPassword"
                    className="input input-bordered flex items-center gap-2"
                >
                    <div className="i-mdi-key-variant h-4 w-4" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-64"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <div
                            className={cn(
                                {
                                    "i-mdi-eye": !showPassword,
                                    "i-mdi-eye-off": showPassword,
                                },
                                "h-4 w-4",
                            )}
                        />
                    </button>
                </label>
                <button type="submit" className="btn btn-primary text-white">
                    Signup
                </button>
            </form>

            <div className="my-4 mx-auto text-lg font-semibold">OR</div>

            <button
                className="btn btn-outline btn-primary flex items-center justify-center text-white"
                onClick={signupWithGoogle}
            >
                <div className="i-mdi-google h-4 w-4" />
                <p>Signup with Google</p>
            </button>
            <button
                className="btn btn-outline btn-primary flex items-center justify-center text-white mt-4"
                onClick={signupWithGithub}
            >
                <div className="i-mdi-github h-4 w-4" />
                <p>Signup with Github</p>
            </button>
        </div>
    );
}
