type OptimizeOptions = {
  width: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'thumb' | 'pad';
  gravity?: 'auto' | 'face' | 'center';
};

/**
 * Injects Cloudinary delivery transformations (size, crop, auto quality/format) into a
 * Cloudinary URL so images from the database are served pre-sized instead of relying on
 * the browser to downscale a full-resolution original. Non-Cloudinary URLs pass through
 * unchanged, since project/formation image URLs are user-managed data of unknown origin.
 */
export function optimizeImageUrl(
  url: string | null | undefined,
  { width, height, crop = 'fill', gravity }: OptimizeOptions
): string {
  if (!url) return '';

  const marker = '/upload/';
  const idx = url.indexOf(marker);
  if (!url.includes('res.cloudinary.com/') || idx === -1) {
    return url;
  }

  const parts = [`w_${width}`];
  if (height) parts.push(`h_${height}`);
  parts.push(`c_${crop}`);
  if (gravity) parts.push(`g_${gravity}`);
  parts.push('q_auto', 'f_auto');

  return `${url.slice(0, idx + marker.length)}${parts.join(',')}/${url.slice(idx + marker.length)}`;
}
