import './globals.css';
import Head from 'next/head';
import { ThemeProvider } from '../../../common/dark-mode/theme-provider/theme-provider';
import ReduxProvider from '@/redux/provider';

import { Providers } from '../../../common/nextui/providers';

import LayoutComponents from './LayoutComponents';
import Provider from '@/app/common/react-query/Providers';

import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';

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
        <meta name="description">{'DBA'}</meta>
      </Head>
      <body className={` dark:bg-dark`}>
        <Provider>
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <Providers>
                <SkeletonTheme baseColor="#494949" highlightColor="#7b7b7b">
                  <LayoutComponents>{children}</LayoutComponents>
                </SkeletonTheme>
              </Providers>
            </ThemeProvider>
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
