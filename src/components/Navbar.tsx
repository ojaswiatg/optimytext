import React from "react";

import ToggleTheme from "./ToggleTheme";

function Navbar() {
    return (
        <nav className="w-full h-16 bg-primary flex items-center px-4">
            <button className="btn btn-outline bg-primary border-white text-white btn-sm">
                Login
            </button>
            <ToggleTheme className="ml-auto" />
        </nav>
    );
}

export default Navbar;
