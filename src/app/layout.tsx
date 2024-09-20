import "../styles/global.scss";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html data-theme="emerald" lang="en" className="h-full w-full">
            <body className="h-fit w-full">{children}</body>
        </html>
    );
}
