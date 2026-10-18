import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata = { title: "Meet with Cameron | Cypulse" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} grid min-h-screen items-start justify-items-center p-4 text-ink md:items-center md:p-6`}
      >
        {children}
      </body>
    </html>
  );
}
