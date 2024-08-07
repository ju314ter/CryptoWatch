import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoWatch++",
  description:
    "Follow your defi position, explore lists and setup alerts. Julien FEGER all rights reserved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          outfit.className,
          "bg-background transition-all overflow-hidden"
        )}
      >
        <Spotlight fill="#74481F" className="transparent-element" />
        <main className="z-10">{children}</main>
        <div
          className="transparent-element"
          style={{
            position: "absolute",
            top: "20%",
            left: "70%",
            width: "300px",
            height: "300px",
          }}
        >
          <Image src="/orangeblur.png" alt="Logo" width={300} height={300} />
        </div>
      </body>
    </html>
  );
}
