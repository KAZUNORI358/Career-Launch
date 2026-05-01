import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ICONS = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
};

export function faviconGenerate(options = {}) {
  const {
    source = 'src/assets/favicon.svg',
    name = 'Static Site',
    shortName = 'Site',
    themeColor = '#ffffff',
    backgroundColor = '#ffffff',
  } = options;

  let resolvedBase = '/';

  return {
    name: 'vite-plugin-favicon-generate',
    apply: 'build',
    enforce: 'post',

    configResolved(config) {
      resolvedBase = config.base;
    },

    async generateBundle() {
      const input = readFileSync(resolve(process.cwd(), source));

      for (const [fileName, size] of Object.entries(ICONS)) {
        const buf = await sharp(input).resize(size, size).png().toBuffer();
        this.emitFile({ type: 'asset', fileName, source: buf });
      }

      const manifest = {
        name,
        short_name: shortName,
        icons: [
          { src: `${resolvedBase}android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${resolvedBase}android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
        ],
        theme_color: themeColor,
        background_color: backgroundColor,
        display: 'standalone',
      };

      this.emitFile({
        type: 'asset',
        fileName: 'site.webmanifest',
        source: JSON.stringify(manifest, null, 2),
      });
    },
  };
}
