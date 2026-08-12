import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'Toky Ralison — Développeur Full Stack Junior',
  description: 'Portfolio de Toky Ralison, Développeur Full Stack Junior basé à Antananarivo : projets, compétences, expériences et formation en développement web.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
