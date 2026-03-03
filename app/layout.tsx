import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Portfolio - Ralison Toky',
  description: 'Portfolio professionnel présentant mes projets, compétences et expériences en développement web',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
