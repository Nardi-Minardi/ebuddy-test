import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/components/StoreProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import "./globals.css";
import "../apis/firebaseConfig";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "E-Buddy Test",
  description: "E-Buddy Test Minardi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
          <meta name='description' content={metadata.description} />
          <title>{metadata.title}</title>
        </head>
        <body>
          <ThemeProvider theme={theme}>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
