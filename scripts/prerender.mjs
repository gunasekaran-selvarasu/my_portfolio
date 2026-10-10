import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const contentDir = path.join(rootDir, 'src', 'content', 'blog');

function parseFrontmatter(rawContent) {
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
  const data = {};

  frontmatterStr.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

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

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function runPrerender() {
  console.log('🚀 Starting Static Pre-rendering & SEO Generator for Blog...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found! Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  if (!fs.existsSync(contentDir)) {
    console.log('No blog content directory found at src/content/blog.');
    return;
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { data, content } = parseFrontmatter(raw);
    const slug = data.slug || file.replace('.md', '');

    posts.push({
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
    });
  }

  // Sort newest first
  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  console.log(`Found ${posts.length} blog posts to pre-render.`);

  // 1. Generate /blog/index.html
  const blogListDir = path.join(distDir, 'blog');
  if (!fs.existsSync(blogListDir)) {
    fs.mkdirSync(blogListDir, { recursive: true });
  }

  let blogIndexHtml = templateHtml;

  // Replace Title & Meta tags
  blogIndexHtml = blogIndexHtml.replace(
    /<title>.*?<\/title>/,
    `<title>Technical Blog &amp; Architectural Deep Dives | Gunasekaran Selvarasu</title>`
  );

  blogIndexHtml = blogIndexHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="Engineering deep dives, AWS cloud architectures, and fullstack performance patterns by Gunasekaran Selvarasu." />`
  );

  blogIndexHtml = blogIndexHtml.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="https://guna.dev/blog" />`
  );

  blogIndexHtml = blogIndexHtml.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="Technical Blog &amp; Architectural Deep Dives | Gunasekaran Selvarasu" />`
  );

  blogIndexHtml = blogIndexHtml.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="https://guna.dev/blog" />`
  );

  // Pre-bake blog list semantic HTML into #root
  const blogListPrerenderContent = `
    <div id="root">
      <main style="max-width: 1200px; margin: 0 auto; padding: 120px 24px 80px;">
        <header style="text-align: center; margin-bottom: 60px;">
          <h1 style="font-size: 2.5rem; font-weight: 800; color: #ffffff; margin-bottom: 16px;">
            Architectural Insights &amp; Technical Deep Dives
          </h1>
          <p style="font-size: 1.125rem; color: #d4d4d8; max-width: 700px; margin: 0 auto;">
            Battle-tested patterns, system architecture case studies, and performance engineering lessons from building scalable fullstack applications.
          </p>
        </header>
        <section aria-label="Articles List" style="display: grid; gap: 24px;">
          ${posts
            .map(
              (p) => `
            <article style="padding: 24px; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; background: rgba(15,23,42,0.4);">
              <span style="color: #818cf8; font-size: 0.875rem; font-weight: 600;">${escapeHtml(p.category)} · ${p.readTime}</span>
              <h2 style="font-size: 1.5rem; margin: 8px 0; color: #ffffff;">
                <a href="/blog/${p.slug}" style="color: #ffffff; text-decoration: none;">${escapeHtml(p.title)}</a>
              </h2>
              <p style="color: #a1a1aa; font-size: 0.95rem; line-height: 1.6;">${escapeHtml(p.description)}</p>
              <div style="margin-top: 16px; color: #71717a; font-size: 0.85rem;">Published: ${p.publishedAt}</div>
            </article>
          `
            )
            .join('\n')}
        </section>
      </main>
    </div>
  `;

  blogIndexHtml = blogIndexHtml.replace('<div id="root"></div>', blogListPrerenderContent);
  fs.writeFileSync(path.join(blogListDir, 'index.html'), blogIndexHtml, 'utf-8');
  console.log('✅ Generated dist/blog/index.html');

  // 2. Generate each post: dist/blog/[slug]/index.html
  for (const post of posts) {
    const postDir = path.join(blogListDir, post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    let postHtml = templateHtml;
    const postUrl = `https://guna.dev/blog/${post.slug}`;
    const coverUrl = post.coverImage.startsWith('http')
      ? post.coverImage
      : `https://guna.dev${post.coverImage}`;

    // Title
    postHtml = postHtml.replace(
      /<title>.*?<\/title>/,
      `<title>${escapeHtml(post.title)} | Gunasekaran Selvarasu</title>`
    );

    // Meta Description
    postHtml = postHtml.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${escapeHtml(post.description)}" />`
    );

    // Canonical
    postHtml = postHtml.replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="${postUrl}" />`
    );

    // Open Graph Tags
    postHtml = postHtml.replace(
      /<meta property="og:type" content=".*?" \/>/,
      `<meta property="og:type" content="article" />`
    );

    postHtml = postHtml.replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${escapeHtml(post.title)}" />`
    );

    postHtml = postHtml.replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${escapeHtml(post.description)}" />`
    );

    postHtml = postHtml.replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${postUrl}" />`
    );

    postHtml = postHtml.replace(
      /<meta property="og:image" content=".*?" \/>/,
      `<meta property="og:image" content="${coverUrl}" />`
    );

    // Twitter Card Tags
    postHtml = postHtml.replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(post.title)}" />`
    );

    postHtml = postHtml.replace(
      /<meta name="twitter:description" content=".*?" \/>/,
      `<meta name="twitter:description" content="${escapeHtml(post.description)}" />`
    );

    postHtml = postHtml.replace(
      /<meta name="twitter:image" content=".*?" \/>/,
      `<meta name="twitter:image" content="${coverUrl}" />`
    );

    // Structured Data (JSON-LD) for TechArticle
    const jsonLdArticle = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: post.title,
      description: post.description,
      url: postUrl,
      image: coverUrl,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        '@type': 'Person',
        name: 'Gunasekaran Selvarasu',
        url: 'https://guna.dev/',
        jobTitle: 'Senior Fullstack Developer & AWS Certified Practitioner',
      },
      publisher: {
        '@type': 'Person',
        name: 'Gunasekaran Selvarasu',
      },
      keywords: post.tags.join(', '),
      articleSection: post.category,
    };

    const structuredDataTag = `
    <!-- Injected TechArticle JSON-LD Structured Data for Rich Snippets -->
    <script type="application/ld+json">
      ${JSON.stringify(jsonLdArticle, null, 2)}
    </script>
    `;

    postHtml = postHtml.replace('</head>', `${structuredDataTag}\n</head>`);

    // Render markdown content to HTML for pre-baked SEO
    const renderedArticleHtml = marked.parse(post.content);

    const prerenderArticleRoot = `
    <div id="root">
      <main style="max-width: 896px; margin: 0 auto; padding: 120px 24px 80px;">
        <article>
          <header style="margin-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px;">
            <div style="color: #818cf8; font-size: 0.875rem; font-weight: 700; text-transform: uppercase;">
              ${escapeHtml(post.category)} · ${post.readTime}
            </div>
            <h1 style="font-size: 2.5rem; font-weight: 800; color: #ffffff; line-height: 1.25; margin: 16px 0;">
              ${escapeHtml(post.title)}
            </h1>
            <p style="font-size: 1.125rem; color: #d4d4d8; line-height: 1.6;">
              ${escapeHtml(post.description)}
            </p>
            <div style="margin-top: 16px; color: #a1a1aa; font-size: 0.875rem;">
              By <strong>Gunasekaran Selvarasu</strong> · Published on ${post.publishedAt}
            </div>
          </header>
          <div class="prose" style="color: #d4d4d8; line-height: 1.8; font-size: 1.05rem;">
            ${renderedArticleHtml}
          </div>
        </article>
      </main>
    </div>
    `;

    postHtml = postHtml.replace('<div id="root"></div>', prerenderArticleRoot);

    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf-8');
    console.log(`✅ Generated dist/blog/${post.slug}/index.html`);
  }

  // 3. Update sitemap.xml with blog URLs
  const sitemapDistPath = path.join(distDir, 'sitemap.xml');
  const sitemapPublicPath = path.join(rootDir, 'public', 'sitemap.xml');

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://guna.dev/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://guna.dev/blog</loc>
    <lastmod>${posts[0]?.publishedAt || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${posts
  .map(
    (p) => `  <url>
    <loc>https://guna.dev/blog/${p.slug}</loc>
    <lastmod>${p.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(sitemapDistPath, sitemapContent, 'utf-8');
  fs.writeFileSync(sitemapPublicPath, sitemapContent, 'utf-8');
  console.log('✅ Updated sitemap.xml in dist/ and public/ with all blog URLs.');

  console.log('🎉 Static pre-rendering completed successfully!');
}

runPrerender().catch((err) => {
  console.error('Error during pre-rendering:', err);
  process.exit(1);
});
