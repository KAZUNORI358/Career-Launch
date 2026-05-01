import sharp from 'sharp';

const TARGET_EXTENSIONS = /\.(jpe?g|png)$/i;

/**
 * Vite plugin: convert JPG/PNG assets to AVIF at build time
 * and rewrite references in HTML output.
 */
export function avifConvert(options = {}) {
  const { quality = 70, effort = 4 } = options;

  return {
    name: 'vite-plugin-avif-convert',
    apply: 'build',
    enforce: 'post',

    async generateBundle(_, bundle) {
      const renames = new Map();

      for (const [fileName, asset] of Object.entries(bundle)) {
        if (asset.type !== 'asset' || !TARGET_EXTENSIONS.test(fileName)) continue;

        const avifName = fileName.replace(TARGET_EXTENSIONS, '.avif');
        const avifBuf = await sharp(Buffer.from(asset.source))
          .avif({ quality, effort })
          .toBuffer();

        this.emitFile({
          type: 'asset',
          fileName: avifName,
          source: avifBuf,
        });

        renames.set(fileName, avifName);
        delete bundle[fileName];
      }

      if (renames.size === 0) return;

      for (const [, asset] of Object.entries(bundle)) {
        if (asset.type !== 'asset' || !asset.fileName.endsWith('.html')) continue;

        let html = typeof asset.source === 'string' ? asset.source : Buffer.from(asset.source).toString('utf-8');
        let changed = false;

        for (const [oldName, newName] of renames) {
          const oldRef = oldName.startsWith('/') ? oldName : `/${oldName}`;
          const newRef = newName.startsWith('/') ? newName : `/${newName}`;

          if (html.includes(oldRef) || html.includes(oldName)) {
            html = html.replaceAll(oldRef, newRef).replaceAll(oldName, newName);
            changed = true;
          }
        }

        if (changed) {
          asset.source = html;
        }
      }
    },
  };
}
