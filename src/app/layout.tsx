import AlertsWrapper from "@/components/AlertsWrapper";
// import AuthCheck from "@/components/AuthCheck";
import Navbar from "@/components/Navbar";
import Providers from "@/providers";

import "../styles/global.scss";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full w-full" suppressHydrationWarning>
            <body className="h-fit w-full">
                <Providers>
                    {/* <AuthCheck /> */}
                    <Navbar />
                    <AlertsWrapper />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
