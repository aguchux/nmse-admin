
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  height: 'device-height',
  userScalable: true,
  viewportFit: 'auto',
  interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
  title: 'Administrator | NMSE Portal',
  description: '',
  keywords: '',
  icons: [
    '/icons/favicon.ico',
    '/icons/apple-tiktokPixelHandlericon-57x57.png',
    '/icons/apple-icon-60x60.png',
    '/icons/apple-icon-72x72.png',
    '/icons/apple-icon-76x76.png',
    '/icons/apple-icon-114x114.png',
    '/icons/apple-icon-120x120.png',
    '/icons/apple-icon-144x144.png',
    '/icons/apple-icon-152x152.png',
    '/icons/apple-icon-180x180.png',
    '/icons/android-icon-192x192.png',
    '/icons/favicon-32x32.png',
    '/icons/favicon-96x96.png',
    '/icons/favicon-16x16.png',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
