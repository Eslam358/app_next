import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_component/navbar";
import Footer from "./_component/footer";

import { Roboto } from "next/font/google";
import store from "./_reduxtoolkit/Store/Store";
// import { Provider } from "react-redux";
import { Providers } from "./Providers";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar />
          {children}

          <Footer />
        </body>
      </html>
    </Providers>
  );
}
