import type { Metadata } from 'next';
import BlogListClient from './BlogListClient';
import { getAllPosts, getAllCategories } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Technical Blog & Architectural Deep Dives',
  description:
    'Engineering deep dives, AWS cloud architectures, and fullstack performance patterns by Gunasekaran Selvarasu.',
  alternates: {
    canonical: 'https://guna.dev/blog',
  },
  openGraph: {
    title: 'Technical Blog & Architectural Deep Dives | Gunasekaran Selvarasu',
    description:
      'Engineering deep dives, AWS cloud architectures, and fullstack performance patterns by Gunasekaran Selvarasu.',
    url: 'https://guna.dev/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog & Architectural Deep Dives | Gunasekaran Selvarasu',
    description:
      'Engineering deep dives, AWS cloud architectures, and fullstack performance patterns by Gunasekaran Selvarasu.',
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  return <BlogListClient allPosts={allPosts} categories={categories} />;
}
