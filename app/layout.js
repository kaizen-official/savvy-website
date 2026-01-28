import { Bodoni_Moda, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NewHeader from "@/components/layout/newHeader";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "Savvy Chauffeur | Where Professionalism Meets Luxury",
  description: "Premier luxury chauffeur service specializing in seamless travel experiences for corporate travel, airport transfers, weddings, and special occasions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bodoniModa.variable} ${lato.variable} antialiased`}
      >
        {/* <Header /> */}
        <NewHeader/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
