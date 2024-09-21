import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

// Ensure you have your global styles

export default function Providers({ children }: { children: ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
