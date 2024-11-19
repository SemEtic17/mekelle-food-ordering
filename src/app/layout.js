import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Mekelle Delivery",
  description: "Created using next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="./manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon-180x180.png"
        ></link>
      </head>
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2023 All rights reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
