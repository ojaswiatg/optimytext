import React from "react";

import ToggleTheme from "./ToggleTheme";

function Navbar() {
    return (
        <nav className="w-full h-12 bg-primary flex items-center px-4">
            {/* if logged in, show a burger menu with: history, logout */}

            <button className="btn btn-outline bg-primary border-white text-white btn-sm">
                Log in
            </button>
            <ToggleTheme className="ml-auto" />
        </nav>
    );
}

export default Navbar;
