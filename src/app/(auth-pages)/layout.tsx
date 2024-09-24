export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <p className="text-xl font-semibold text-center mt-12">
                Login to save and view history
            </p>
            {children}
        </>
    );
}
