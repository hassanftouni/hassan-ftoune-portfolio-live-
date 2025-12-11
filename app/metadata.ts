import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hassan Ftouni — Full Stack Developer & Designer',
  description: 'Portfolio of Hassan Ftouni, a passionate Computer Science Engineer and PhD Candidate specializing in AI-driven systems, Natural Language Processing, and scalable data solutions. Explore my research, publications, projects, and collaborations.',
  keywords: [
    'AI Architect',
    'Full-Stack Engineer', 
    'Machine Learning Engineer',
    'Python Developer',
    'PhD Candidate',
    'Computer Science Engineer',
    'PhD',
    'Freelancer',
    'INPT',
    'Morocco',
    'Rabat',
    'Portfolio',
    'Web Privacy'
  ],
  authors: [{ name: 'Hassan Ftouni', url: 'https://hassanftouni.me' }],
  creator: 'Haassan Ftouni',
  publisher: 'Hassan Ftouni',
  metadataBase: new URL('https://hassanftouni.me'),
  alternates: {
    canonical: 'https://hassanftouni.me',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hassanftouni.me',
    siteName: 'Hassan Ftouni Portfolio',
    title: 'Hassan Ftouni — Full Stack Developer & Designer',
    description: 'Portfolio of Hassan Ftouni, a passionate Computer student and full stack developer specializing in AI-driven systems, Natural Language Processing, and scalable data solutions. Explore my research, publications, projects, and collaborations.',
    images: [
      {
        url: '/my-avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Hassan Ftouni — Full Stack Developer & Designer',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hassan_ftouni',
    creator: '@hassan_ftouni',
    title: 'Hassan Ftouni — Full Stack Developer & Designer',
    description: 'Portfolio of Hassan Ftouni, a passionate Computer student and full stack developer specializing in AI-driven systems, Natural Language Processing, and scalable data solutions. Explore my research, publications, projects, and collaborations.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification IDs when available
    // google: 'google-verification-code',
    // yandex: 'yandex-verification-code',
    // yahoo: 'yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Portfolio Website',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'theme-color': '#100C08',
    'color-scheme': 'dark',
  },
}

export default metadata
