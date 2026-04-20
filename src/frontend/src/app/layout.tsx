import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { AuthProvider } from "@/context/AuthContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const archivoBlack = localFont({
  src: [
    {
      path: "../fonts/ArchivoBlack-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuildersMTY",
  description:
    "Una comunidad abierta de estudiantes y desarrolladores en Monterrey enfocada en construir software y compartir conocimiento.",
  icons: {
    icon: "/builderslogo2.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${archivoBlack.variable} dark`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
