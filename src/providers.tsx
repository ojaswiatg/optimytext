import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

import { AlertProvider } from "./context/alert";
import { UserProvider } from "./context/user";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <AlertProvider>
                <UserProvider>{children}</UserProvider>
            </AlertProvider>
        </ThemeProvider>
    );
}
