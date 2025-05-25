'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { OrganizationProvider } from './organization-provider';
import { dark } from '@clerk/themes';


export function Providers({ children }: { children: React.ReactNode }) {
  // Create a client in the client component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
      afterSignInUrl="/"
    >
      <OrganizationProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </OrganizationProvider>
    </ClerkProvider>
  );
} 