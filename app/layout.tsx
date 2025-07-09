import type { Metadata } from "next";
import { Roboto_Mono as FontRoboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const fontRoboto = FontRoboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "JobPair AI",
  description: "Get your dream job with JobPair AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ cssLayerName: "clerk" }}>
      <html lang="en">
        <body className={`${fontRoboto.variable} font-roboto antialiased`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
