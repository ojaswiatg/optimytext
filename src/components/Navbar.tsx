"use client";

import { UserContext } from "@/context/user";
import { AUTH_PATHS, USER_AUTH_PATHS } from "@/lib/constants";
import { includes } from "lodash-es";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
    const pathName = usePathname();
    const { user } = useContext(UserContext);

    const [hideLoginButton, setHideLoginButton] = useState(true);

    useEffect(() => {
        setHideLoginButton(
            includes([...AUTH_PATHS, ...USER_AUTH_PATHS], pathName) ||
                !!user.email,
        );
    }, [user, pathName]);

    return (
        <nav className="w-full h-12 bg-primary flex items-center justify-between px-4 relative">
            {/* if logged in, show a burger menu with: history, logout */}
            {!hideLoginButton ? (
                <Link
                    href="/login"
                    className="btn btn-outline bg-primary border-white text-white btn-sm"
                >
                    Log in
                </Link>
            ) : null}

            <Link
                className="text-xl font-bold mr-8 text-white absolute left-[50%] -translate-x-1/2"
                href="/"
            >
                Tonely
            </Link>

            <ToggleTheme className="ml-auto" />
        </nav>
    );
}
