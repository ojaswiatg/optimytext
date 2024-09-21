"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleTheme({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        if (localStorage.getItem("theme") === null) {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;
            setTheme(prefersDark ? "night" : "emerald");
        }
    }, [setTheme]);

    function toggleTheme() {
        if (resolvedTheme === "emerald") {
            localStorage.setItem("theme", "night");
            setTheme("night");
        } else {
            localStorage.setItem("theme", "emerald");
            setTheme("emerald");
        }
    }

    return (
        <div className={className}>
            {mounted ? (
                resolvedTheme === "emerald" ? (
                    <button onClick={toggleTheme}>
                        <div className="i-mdi-weather-night text-white h-5 w-5" />
                    </button>
                ) : (
                    <button onClick={toggleTheme}>
                        <div className="i-mdi-weather-sunny text-white h-5 w-5" />
                    </button>
                )
            ) : null}
        </div>
    );
}
