import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

import { UserProvider } from "./context/user";

// Ensure you have your global styles

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <UserProvider>{children}</UserProvider>
        </ThemeProvider>
    );
}
