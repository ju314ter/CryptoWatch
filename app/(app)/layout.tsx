import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Topnav } from "@/components/topnav/Topnav";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CryptoWatch++ application",
  description:
    "Follow your defi position, explore lists and setup alerts. Julien FEGER all rights reserved.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      }
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Topnav className="h-[70px]" />
        <main className="h-[calc(100vh-70px)] flex w-full items-center justify-between p-5">
          {children}
          <Toaster />
        </main>
      </ThemeProvider>
    </Suspense>
  );
}
