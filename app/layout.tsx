'use client';

import { GlobalLoader } from '@/components/loaders/global-loading';
import { AuthContextProvider } from '@/context/AuthContext';
import { AppDialogProvider } from '@/context/DialogContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider } from 'jotai';
import 'jotai-devtools/styles.css';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/global.scss';

const queryClient = new QueryClient();
const customStore = createStore();

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`antialiased  bg-gray-200`}>
        <Provider store={customStore}>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <AppDialogProvider>
                <GlobalLoader />
                {/* <FCMProvider /> */}
                {/* <DevTools store={customStore} /> */}
                {children}
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                  gutter={8}
                  containerClassName=""
                  containerStyle={{}}
                  toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    removeDelay: 1000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    // Default options for specific types
                    success: {
                      duration: 3000,
                      iconTheme: {
                        primary: 'green',
                        secondary: 'black',
                      },
                    },
                    error: {
                      duration: 3000,
                      iconTheme: {
                        primary: 'red',
                        secondary: 'black',
                      },
                    },
                  }}
                />
              </AppDialogProvider>
            </AuthContextProvider>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
