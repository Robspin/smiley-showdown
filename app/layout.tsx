import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/pro-regular-svg-icons'
import "./globals.css";

// library.add(Object.values(far).filter(i => i.iconName.includes('face'))})
library.add(far)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smiley Showdown",
  description: "They can't all keep smiling forever!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} w-full flex flex-col items-center overflow-y-scroll`}>
        <div className="max-lg:min-w-full lg:min-w-[1024px] max-w-[1024px] p-3 md:p-8">
          {children}
        </div>
    </body>
    </html>
);
}
