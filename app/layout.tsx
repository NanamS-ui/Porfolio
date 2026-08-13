import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-domaine.com';
const title = 'Toky Ralison — Développeur Full Stack Junior';
const description =
  'Portfolio de Toky Ralison, Développeur Full Stack Junior basé à Antananarivo : projets, compétences, expériences et formation en développement web.';

// Recadrage 1200x630 (format standard Open Graph) de la même photo utilisée dans le Hero.
const ogImageUrl =
  'https://res.cloudinary.com/drakabvg2/image/upload/w_1200,h_630,c_fill,g_face,q_auto,f_auto/v1759923729/001_nysary_mayy4m.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Toky Ralison — Portfolio',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'Toky Ralison — Développeur Full Stack Junior' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImageUrl],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Toky Ralison',
  jobTitle: 'Développeur Full Stack Junior',
  url: siteUrl,
  image: ogImageUrl,
  email: 'mailto:rahajamananatoky@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Antananarivo',
    addressCountry: 'MG',
  },
  sameAs: [
    'https://github.com/NanamS-ui',
    'http://linkedin.com/in/toky-ralison-1bb162340',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
