import fs from 'fs';
import path from 'path';

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

/**
 * Robust frontmatter parser
 */
export function parseFrontmatter(rawContent: string): { data: Record<string, any>; content: string } {
  const trimmed = rawContent.trimStart();
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: rawContent };
  }

  const endMatch = trimmed.slice(3).indexOf('---');
  if (endMatch === -1) {
    return { data: {}, content: rawContent };
  }

  const frontmatterStr = trimmed.slice(3, endMatch + 3).trim();
  const bodyContent = trimmed.slice(endMatch + 6).trim();
  const data: Record<string, any> = {};

  frontmatterStr.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse array if format: ["a", "b"] or [a, b]
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else if (value.toLowerCase() === 'true') {
      data[key] = true;
    } else if (value.toLowerCase() === 'false') {
      data[key] = false;
    } else {
      data[key] = value;
    }
  });

  return { data, content: bodyContent };
}

const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));

  const posts: BlogPost[] = fileNames.map((fileName) => {
    const fullPath = path.join(contentDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = parseFrontmatter(fileContents);
    const slug = data.slug || fileName.replace(/\.md$/, '');

    return {
      title: data.title || 'Untitled Post',
      slug,
      description: data.description || '',
      publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
      readTime: data.readTime || '5 min read',
      category: data.category || 'Engineering',
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverImage: data.coverImage || '/og-image.png',
      featured: Boolean(data.featured),
      content,
    };
  });

  // Sort newest first
  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  cachedPosts = posts;
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories);
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  return { prev, next };
}
