import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Leave Management",
  description: "Leave management frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
