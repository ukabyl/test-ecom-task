import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern E-commerce Store',
  description: 'Discover our amazing products with great deals',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Providers>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </Providers>
    </body>
    </html>
  );
}