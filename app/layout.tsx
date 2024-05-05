import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/pro-regular-svg-icons'
import "./globals.css";
import Link from 'next/link'

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
      <link rel="icon" href="/favicon.png" sizes="any"/>
      <body className={`${inter.className} w-full flex flex-col items-center overflow-y-scroll`}>
      <div className="max-lg:min-w-full lg:min-w-[1024px] max-w-[1024px] p-3 md:p-8">
          <Link href="/">Home</Link>
          {children}
      </div>
      </body>
      </html>
  );
}
