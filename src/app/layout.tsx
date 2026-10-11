import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://guna.dev'),
  title: {
    default: 'Gunasekaran Selvarasu – Senior Fullstack Developer & AWS Certified',
    template: '%s | Gunasekaran Selvarasu',
  },
  description:
    'Senior Fullstack Developer & AWS Certified Practitioner specializing in React, Next.js, Node.js, TypeScript, REST APIs, and scalable cloud architectures.',
  keywords: [
    'Gunasekaran Selvarasu',
    'Fullstack Developer',
    'Senior Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript',
    'AWS Certified Cloud Practitioner',
    'Chennai',
    'Portfolio',
    'REST APIs',
    'Microservices',
    'MongoDB',
    'MySQL',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Gunasekaran Selvarasu', url: 'https://guna.dev/' }],
  creator: 'Gunasekaran Selvarasu',
  alternates: {
    canonical: 'https://guna.dev/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'profile',
    firstName: 'Gunasekaran',
    lastName: 'Selvarasu',
    username: 'gunasekaran-selvarasu',
    gender: 'male',
    locale: 'en_US',
    url: 'https://guna.dev/',
    siteName: 'Gunasekaran Selvarasu Portfolio',
    title: 'Gunasekaran Selvarasu – Senior Fullstack Developer & AWS Certified',
    description:
      'Senior Fullstack Developer & AWS Certified Practitioner specializing in React, Next.js, Node.js, TypeScript, REST APIs, and scalable cloud architectures.',
    images: [
      {
        url: 'https://guna.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gunasekaran Selvarasu – Senior Fullstack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gunasekaran Selvarasu – Senior Fullstack Developer & AWS Certified',
    description:
      'Senior Fullstack Developer & AWS Certified Practitioner specializing in React, Next.js, Node.js, TypeScript, REST APIs, and scalable cloud architectures.',
    images: ['https://guna.dev/og-image.png'],
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
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Chennai',
    'geo.position': '13.0827;80.2707',
    ICBM: '13.0827, 80.2707',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://guna.dev/#website',
      url: 'https://guna.dev/',
      name: 'Gunasekaran Selvarasu Portfolio',
      description: 'Senior Fullstack Developer & AWS Certified Cloud Practitioner Portfolio',
      inLanguage: 'en-US',
      publisher: {
        '@id': 'https://guna.dev/#person',
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://guna.dev/#profilepage',
      url: 'https://guna.dev/',
      name: 'Gunasekaran Selvarasu – Senior Fullstack Developer & AWS Certified',
      isPartOf: {
        '@id': 'https://guna.dev/#website',
      },
      about: {
        '@id': 'https://guna.dev/#person',
      },
      mainEntity: {
        '@id': 'https://guna.dev/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://guna.dev/#person',
      name: 'Gunasekaran Selvarasu',
      givenName: 'Gunasekaran',
      familyName: 'Selvarasu',
      jobTitle: 'Senior Fullstack Developer & AWS Certified Cloud Practitioner',
      description:
        'Senior Fullstack Developer specializing in React, Next.js, Node.js, TypeScript, MongoDB, MySQL, Tailwind CSS, Material UI, Ant Design, JWT, OAuth, SSR, and cloud architecture.',
      url: 'https://guna.dev/',
      image: 'https://guna.dev/profile/gunasekaran_selvarasu.webp',
      sameAs: [
        'https://github.com/gunasekaran-selvarasu',
        'https://linkedin.com/in/gunasekaran-selvarasu',
        'https://www.credly.com/badges/da73f66c-5901-455c-a2c6-0748ee3e55af/public_url',
      ],
      email: 'mailto:sguna0100@gmail.com',
      nationality: {
        '@type': 'Country',
        name: 'India',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'India',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'E.G.S. Pillay Engineering College',
          award: 'Master of Computer Applications (MCA)',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'E.G.S. Pillay Arts and Science College',
          award: 'Bachelor of Computer Applications (BCA)',
        },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'AWS Certified Cloud Practitioner',
          credentialCategory: 'Professional Certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Amazon Web Services (AWS)',
          },
          url: 'https://www.credly.com/badges/da73f66c-5901-455c-a2c6-0748ee3e55af/public_url',
        },
      ],
      knowsAbout: [
        'Fullstack Web Development',
        'React.js',
        'Next.js',
        'Node.js',
        'Express.js',
        'TypeScript',
        'JavaScript',
        'MongoDB',
        'MySQL',
        'Tailwind CSS',
        'Material UI',
        'Ant Design',
        'Redux Toolkit',
        'JWT (JSON Web Tokens)',
        'OAuth 2.0',
        'Server-Side Rendering (SSR)',
        'Amazon Web Services (AWS)',
        'Cloud Architecture',
        'RESTful APIs',
      ],
    },
    {
      '@type': 'ItemList',
      '@id': 'https://guna.dev/#projects',
      name: 'Featured Engineering Projects',
      itemListElement: [
        {
          '@type': 'SoftwareApplication',
          position: 1,
          name: 'Asian School of Business (ASB)',
          applicationCategory: 'Educational Application',
          operatingSystem: 'Web',
          description:
            'Enterprise educational platform supporting academic portals, dynamic course scheduling, and real-time student dashboards using Next.js SSR and Node.js.',
        },
        {
          '@type': 'SoftwareApplication',
          position: 2,
          name: 'Meii AI Platform',
          applicationCategory: 'Dashboard Application',
          operatingSystem: 'Web',
          description:
            'Sophisticated AI analytics dashboard displaying predictive charts, model metrics, and automated conversational prompts using React.js and Ant Design.',
        },
        {
          '@type': 'SoftwareApplication',
          position: 3,
          name: 'Sofa33 Customizer',
          applicationCategory: 'E-Commerce Application',
          operatingSystem: 'Web',
          description:
            'Interactive high-end home furnishing store featuring virtual 3D customization logic, smart freight estimates, and responsive product previews.',
        },
        {
          '@type': 'SoftwareApplication',
          position: 4,
          name: 'Dgiverse Web Application',
          applicationCategory: 'Business Application',
          operatingSystem: 'Web',
          description:
            'Fast-loading marketing and business portal engineered for high-speed search engine indexing, SSR performance, and responsive scaling.',
        },
        {
          '@type': 'SoftwareApplication',
          position: 5,
          name: 'Tradewave International',
          applicationCategory: 'Trading Portal',
          operatingSystem: 'Web',
          description:
            'Global trading and import-export catalog portal supporting inquiry channels, products directory, and logistics checklists.',
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.credly.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
