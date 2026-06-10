import sharp from "sharp";

// Branded 1200x630 Open Graph card, matching the site's dark/neon identity.
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#041020"/>
      <stop offset="50%" stop-color="#0a0e1a"/>
      <stop offset="100%" stop-color="#041020"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#01FDFE"/>
      <stop offset="50%" stop-color="#5B2FB8"/>
      <stop offset="100%" stop-color="#FD67EB"/>
    </linearGradient>
    <radialGradient id="glowP" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#5B2FB8" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#5B2FB8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowC" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#01FDFE" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#01FDFE" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <ellipse cx="980" cy="160" rx="380" ry="320" fill="url(#glowP)"/>
  <ellipse cx="180" cy="520" rx="340" ry="300" fill="url(#glowC)"/>

  <!-- Eyebrow -->
  <text x="90" y="240" font-family="Arial, Helvetica, sans-serif" font-size="26"
        font-weight="600" letter-spacing="6" fill="#01FDFE">
    AGENCIA DIGITAL · AREQUIPA, PERÚ
  </text>

  <!-- Title -->
  <text x="86" y="345" font-family="Arial, Helvetica, sans-serif" font-size="104"
        font-weight="800" letter-spacing="-2" fill="url(#brand)">
    Vintia Digital
  </text>

  <!-- Subtitle -->
  <text x="90" y="430" font-family="Arial, Helvetica, sans-serif" font-size="40"
        font-weight="500" fill="#ffffff" fill-opacity="0.85">
    Estrategias Digitales de Clase Mundial
  </text>
  <text x="90" y="485" font-family="Arial, Helvetica, sans-serif" font-size="30"
        font-weight="400" fill="#ffffff" fill-opacity="0.45">
    Desarrollo web · Marketing · Branding · Software a medida
  </text>

  <!-- Accent line -->
  <rect x="90" y="525" width="120" height="5" rx="2.5" fill="url(#brand)"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
console.log("Wrote public/og-image.png (1200x630)");
