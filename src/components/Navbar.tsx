import Link from "next/link";
import React from "react";

import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
    // const showAuthOptions = true;

    return (
        <nav className="w-full h-12 bg-primary flex items-center justify-between px-4">
            {/* if logged in, show a burger menu with: history, logout */}

            <Link
                href="/login"
                className="btn btn-outline bg-primary border-white text-white btn-sm"
            >
                Log in
            </Link>

            <Link className="text-xl font-bold mr-8 text-white" href="/">
                Tonely
            </Link>

            <ToggleTheme />
        </nav>
    );
}
