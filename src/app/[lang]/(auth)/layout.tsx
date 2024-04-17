'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from '../../common/dark-mode/theme-provider/theme-provider';
import ReduxProvider from '@/redux/provider';

import { Providers } from '../../common/nextui/providers';
import AnimateClick from '@/app/common/ui/animate-click/AnimateClick';
import { ThemeSwitcher } from '@/app/common/dark-mode/theme-switcher/ThemeSwitcher';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <Head>
        <meta name="description">{'Swivy'}</meta>
      </Head>
      <body className={`${inter.className}  dark:bg-[#192428]`}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers>
              <AnimateClick>
                <div className="bg-[#414C50] dark:bg-[#414C50] cursor-pointer rounded-full w-12 h-12 p-1 flex items-center justify-center">
                  <ThemeSwitcher />
                </div>
              </AnimateClick>
              <div className="flex">
                {/* <Sidebar /> <div className="w-full ">{children}</div> */}
                {children}
              </div>
            </Providers>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
