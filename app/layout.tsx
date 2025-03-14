import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProviderClient } from './clerk-provider';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NexusHub | YouTube Collaboration Platform',
  description: 'NexusHub is the all-in-one platform for YouTube creators and video editors to collaborate seamlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProviderClient>
          <Providers>
            {children}
          </Providers>
        </ClerkProviderClient>
      </body>
    </html>
  );
}
