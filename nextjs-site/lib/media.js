import { getStrapiURL } from './strapi';

/**
 * Strapi Media URL Resolver
 * Resolves media object, nested format, or fallback media path safely for both images and videos.
 */

export function getStrapiMediaUrl(media, format = 'large') {
  if (!media) return null;

  // If it's already a string URL
  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://') || media.startsWith('/images/')) {
      return media;
    }
    return getStrapiURL(media);
  }

  // If media is a Strapi 5 or Strapi 4 object
  const mediaData = media.data ? media.data : media;
  const attributes = mediaData?.attributes ? mediaData.attributes : mediaData;

  if (!attributes) return null;

  let url = null;

  // Check if formats exist (standard for responsive images)
  if (attributes.formats) {
    if (format === 'large' && attributes.formats.large?.url) {
      url = attributes.formats.large.url;
    } else if (attributes.formats.medium?.url) {
      url = attributes.formats.medium.url;
    } else if (attributes.formats.small?.url) {
      url = attributes.formats.small.url;
    } else if (attributes.formats.thumbnail?.url) {
      url = attributes.formats.thumbnail.url;
    }
  }

  // Fallback to original url (standard for videos, non-responsive files, or original image)
  if (!url && attributes.url) {
    url = attributes.url;
  }

  if (!url) return null;

  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/images/')) {
    return url;
  }

  return getStrapiURL(url);
}

export function getPlaceholderImage(category = 'corporate') {
  switch (category) {
    case 'company':
      return '/images/about-corporate.jpg';
    case 'brand':
      return '/images/logo.png';
    case 'news':
      return '/images/about-corporate.jpg';
    case 'leader':
      return '/images/chairman.jpg';
    default:
      return '/images/about-corporate.jpg';
  }
}
