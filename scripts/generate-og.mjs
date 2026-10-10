import sharp from 'sharp';

async function generateSocialImages() {
  const width = 1200;
  const height = 630;

  // =========================================================================
  // 1. Recommended: Centered Full-Face Portrait Social Card (Safe for 1:1 and 1.91:1)
  // =========================================================================
  const avatarSize = 250;
  const avatarCircleSvg = Buffer.from(`
    <svg width="${avatarSize}" height="${avatarSize}">
      <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#ffffff" />
    </svg>
  `);

  const avatar = await sharp('public/profile/gunasekaran_selvarasu.webp')
    .resize(avatarSize, avatarSize, { fit: 'cover' })
    .composite([{ input: avatarCircleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const svgPortrait = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#09090b" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#09090b" />
        </linearGradient>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#818cf8" />
          <stop offset="50%" stop-color="#c084fc" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="50%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000000" flood-opacity="0.7" />
        </filter>
      </defs>
      
      <!-- High-tech dark gradient backdrop -->
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      
      <!-- Glowing orbs placed behind avatar safe-zone -->
      <circle cx="600" cy="205" r="180" fill="#6366f1" opacity="0.25" filter="url(#glow)" />
      <circle cx="600" cy="205" r="140" fill="#06b6d4" opacity="0.2" filter="url(#glow)" />
      
      <!-- Subtle inner card border -->
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="28" fill="none" stroke="#27272a" stroke-width="2" />
      
      <!-- Ring behind avatar with gradient accent -->
      <circle cx="600" cy="205" r="132" fill="none" stroke="url(#ringGrad)" stroke-width="6" filter="url(#shadow)" />
      <circle cx="600" cy="205" r="126" fill="#18181b" />

      <!-- Typography (All within center safe zone x: 285 to 915) -->
      <text x="600" y="405" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="-1">
        Gunasekaran Selvarasu
      </text>
      <text x="600" y="455" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="700" fill="url(#primaryGrad)">
        Senior Fullstack Developer &amp; AWS Certified
      </text>
      <text x="600" y="505" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#94a3b8">
        React · Next.js · Node.js · TypeScript · AWS Cloud
      </text>
      <text x="600" y="555" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#818cf8">
        guna.dev · Chennai, India
      </text>
    </svg>
  `);

  await sharp(svgPortrait)
    .composite([
      {
        input: avatar,
        top: 80,
        left: 475, // 600 - (250/2)
      },
    ])
    .png({ quality: 95 })
    .toFile('public/og-image.png');

  // =========================================================================
  // 2. Alternative: Branded Favicon / Monogram Card
  // =========================================================================
  const iconBuffer = await sharp('public/icon-512.png')
    .resize(240, 240)
    .toBuffer();

  const svgFavicon = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#09090b" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#09090b" />
        </linearGradient>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#818cf8" />
          <stop offset="50%" stop-color="#c084fc" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="80" />
        </filter>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <circle cx="600" cy="210" r="190" fill="#6366f1" opacity="0.25" filter="url(#glow)" />
      <circle cx="600" cy="210" r="140" fill="#06b6d4" opacity="0.2" filter="url(#glow)" />
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="28" fill="none" stroke="#27272a" stroke-width="2" />
      
      <g transform="translate(600, 75)">
        <text x="0" y="0" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#818cf8" letter-spacing="2">
          GUNA.DEV · PORTFOLIO
        </text>
      </g>

      <text x="600" y="420" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="-1">
        Gunasekaran Selvarasu
      </text>
      <text x="600" y="470" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="700" fill="url(#primaryGrad)">
        Senior Fullstack Developer &amp; AWS Certified
      </text>
      <text x="600" y="520" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#94a3b8">
        React · Next.js · Node.js · TypeScript · Cloud Architectures
      </text>
    </svg>
  `);

  await sharp(svgFavicon)
    .composite([
      {
        input: iconBuffer,
        top: 110,
        left: 480, // 600 - 120
      },
    ])
    .png({ quality: 95 })
    .toFile('public/og-image-favicon.png');

  console.log('✅ Generated public/og-image.png (Full Face Card) and public/og-image-favicon.png (Favicon Card)');
}

generateSocialImages().catch(console.error);
