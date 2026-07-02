import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ThemeProviderC from "@/components/ThemeProviderC";
import Themer from "@/components/Themer";
import QueryClientProviderC from "@/components/QueryClientProviderC";
import ProfileCard from "@/components/ProfileCard";
import { TooltipProvider } from "@/components/ui/tooltip";
import SvgLogo from "@/public/svg-logo";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notie",
  description: "Web based push notification system",
  icons: {
    icon: [
        { url: "/fav-mid.png", type: "image/svg+xml" },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProviderC>
          <QueryClientProviderC>
            <TooltipProvider>
              <>
              {/* Header */}
              <div className="w-full flex justify-around py-4 items-center">
                <SvgLogo width={300} height={70}/>
                <div className="flex gap-4 items-center">
                  <Themer />
                  <ProfileCard />
                </div>
              </div>
              <>
                {children}
                <Toaster richColors closeButton />
              </>
              </>
            </TooltipProvider>
          </QueryClientProviderC>
        </ThemeProviderC>
      </body>
    </html>
  );
}
