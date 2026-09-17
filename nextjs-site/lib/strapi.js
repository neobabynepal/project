/**
 * Universal Strapi 5 & 4 API Client
 * Features:
 * - Direct REST fetching with error resilience
 * - Strapi 5 flattened format & Strapi 4 attribute unnesting
 * - Normalization for uppercase/lowercase field names
 * - Automatic fallback to curated corporate data when CMS endpoint is empty
 */

import {
  FALLBACK_SITE_SETTINGS,
  FALLBACK_ABOUT,
  FALLBACK_COMPANIES,
  FALLBACK_BRANDS,
  FALLBACK_NEWS,
  FALLBACK_GALLERY,
  FALLBACK_CHAIRMAN,
  FALLBACK_LEADERS,
  FALLBACK_VACANCIES,
  FALLBACK_POLICIES,
  FALLBACK_HOMEPAGE
} from './fallbackData';

const FALLBACK_STRAPI_LOCAL = 'http://localhost:1337';

/**
 * Helper to get normalized Strapi base URL without trailing slash
 */
export function getStrapiBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/$/, '');
  }
  return FALLBACK_STRAPI_LOCAL;
}

/**
 * Helper to resolve absolute Strapi endpoints or media paths
 */
export function getStrapiURL(path = '') {
  const baseUrl = getStrapiBaseUrl();
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `${baseUrl}${cleanPath}`;
}

/**
 * Base fetch helper
 */
async function fetchStrapi(endpoint, params = {}) {
  try {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const baseUrl = getStrapiBaseUrl();
    const url = new URL(`/api/${cleanEndpoint}`, baseUrl);
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, val);
      }
    });

    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    // Graceful handling if Strapi is not running or network fails
    return null;
  }
}

/**
 * Helper to extract plain text string from strings, arrays, or Strapi 5 Rich Text Block objects
 */
export function extractPlainText(val) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    return val.map(b => extractPlainText(b)).filter(Boolean).join('\n\n').trim();
  }
  if (typeof val === 'object') {
    if (val.children && Array.isArray(val.children)) {
      return val.children.map(c => c.text || '').join('');
    }
    if (val.text) return val.text;
  }
  return '';
}

/**
 * Normalize Strapi item (handles Strapi 5 flat objects and Strapi 4 { id, attributes } objects)
 */
function normalizeItem(raw) {
  if (!raw) return null;
  const item = raw.attributes ? { id: raw.id, ...raw.attributes } : raw;
  return item;
}

// ---------------------- 1. SITE SETTINGS ----------------------
export async function getSiteSettings() {
  const res = await fetchStrapi('site-setting', { populate: '*' }) || await fetchStrapi('site-settings', { populate: '*' });
  if (res?.data) {
    const data = normalizeItem(res.data);
    return {
      siteName: data.siteName || data.SiteName || FALLBACK_SITE_SETTINGS.siteName,
      tagline: data.tagline || data.Tagline || FALLBACK_SITE_SETTINGS.tagline,
      phone: data.phone || data.Phone || FALLBACK_SITE_SETTINGS.phone,
      email: data.email || data.Email || FALLBACK_SITE_SETTINGS.email,
      address: data.address || data.Address || FALLBACK_SITE_SETTINGS.address,
      officeHours: data.officeHours || data.OfficeHours || FALLBACK_SITE_SETTINGS.officeHours,
      facebook: data.facebook || data.Facebook || FALLBACK_SITE_SETTINGS.facebook,
      instagram: data.instagram || data.Instagram || FALLBACK_SITE_SETTINGS.instagram,
      linkedin: data.linkedin || data.Linkedin || FALLBACK_SITE_SETTINGS.linkedin,
      youtube: data.youtube || data.Youtube || FALLBACK_SITE_SETTINGS.youtube,
      tiktok: data.tiktok || data.Tiktok || FALLBACK_SITE_SETTINGS.tiktok,
      logo: data.logo || FALLBACK_SITE_SETTINGS.logo
    };
  }
  return FALLBACK_SITE_SETTINGS;
}

// ---------------------- 2. ABOUT ----------------------
export async function getAboutContent() {
  const res = await fetchStrapi('about', { populate: '*' });
  if (res?.data) {
    const data = normalizeItem(res.data);
    return {
      whoWeAreTitle: data.whoWeAreTitle || data.WhoWeAreTitle || FALLBACK_ABOUT.whoWeAreTitle,
      whoWeAreContent: data.whoWeAreContent || data.WhoWeAreContent || FALLBACK_ABOUT.whoWeAreContent,
      ourStoryTitle: data.ourStoryTitle || data.OurStoryTitle || FALLBACK_ABOUT.ourStoryTitle,
      ourStoryContent: data.ourStoryContent || data.OurStoryContent || FALLBACK_ABOUT.ourStoryContent
    };
  }
  return FALLBACK_ABOUT;
}

// ---------------------- 3. COMPANIES ----------------------
export async function getCompanies() {
  const res = await fetchStrapi('companies', { populate: '*' });
  if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map(raw => {
      const item = normalizeItem(raw);
      return {
        id: item.id || item.documentId,
        name: item.name || item.Name || item.title || '',
        slug: item.slug || item.Slug || String(item.id),
        tagline: item.tagline || item.Tagline || '',
        category: item.category || item.Category || '',
        location: item.location || item.Location || '',
        shortDesc: item.shortDesc || item.ShortDesc || item.summary || '',
        fullDesc: item.fullDesc || item.FullDesc || item.description || '',
        website: item.website || item.Website || '',
        logo: item.logo || null,
        coverImage: item.coverImage || item.CoverImage || item.image || null,
        functions: item.functions || []
      };
    });
  }
  return FALLBACK_COMPANIES;
}

export async function getCompanyBySlug(slug) {
  const companies = await getCompanies();
  return companies.find(c => c.slug === slug || String(c.id) === slug) || null;
}

// ---------------------- 4. BRANDS ----------------------
export async function getBrands() {
  const res = await fetchStrapi('brands', { populate: '*' });
  if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map(raw => {
      const item = normalizeItem(raw);
      return {
        id: item.id || item.documentId,
        name: item.name || item.Name || '',
        slug: item.slug || item.Slug || String(item.id),
        origin: item.origin || item.Origin || '',
        relationship: item.relationship || item.Relationship || '',
        shortDesc: item.shortDesc || item.ShortDesc || '',
        fullDesc: item.fullDesc || item.FullDesc || '',
        website: item.website || item.Website || '',
        logo: item.logo || null,
        image: item.image || item.Image || item.coverImage || null
      };
    });
  }
  return FALLBACK_BRANDS;
}

export async function getBrandBySlug(slug) {
  const brands = await getBrands();
  return brands.find(b => b.slug === slug || String(b.id) === slug) || null;
}

// ---------------------- 5. NEWS & EVENTS ----------------------
export async function getNewsPosts() {
  const res = await fetchStrapi('news-posts', { populate: '*', sort: 'createdAt:desc' });
  if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map(raw => {
      const item = normalizeItem(raw);
      return {
        id: item.id || item.documentId,
        title: item.title || item.Title || '',
        slug: item.slug || item.Slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : String(item.id)),
        category: item.category || item.Category || 'Company News',
        publishedAt: item.publishedAt || item.createdAt || new Date().toISOString(),
        summary: item.summary || item.Summary || item.shortDesc || '',
        content: item.content || item.Content || '',
        coverImage: item.coverImage || item.CoverImage || null
      };
    });
  }
  return FALLBACK_NEWS;
}

export async function getNewsPostBySlug(slug) {
  const posts = await getNewsPosts();
  return posts.find(p => p.slug === slug || String(p.id) === slug) || null;
}

// ---------------------- 6. GALLERY ----------------------
export async function getGallery() {
  const res = await fetchStrapi('gallery', { populate: '*' });
  if (res?.data) {
    const data = normalizeItem(res.data);
    const images = data.images?.data || data.images || [];
    if (Array.isArray(images) && images.length > 0) {
      return images.map((img, idx) => {
        const item = normalizeItem(img);
        return {
          id: item.id || idx,
          url: item.url,
          caption: item.caption || item.alternativeText || item.name || 'Adhikari Group Operations',
          formats: item.formats
        };
      });
    }
  }
  return FALLBACK_GALLERY;
}

// ---------------------- 7. VACANCIES ----------------------
export async function getVacancies() {
  const res = await fetchStrapi('vacancies', { populate: '*' });
  if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map(raw => {
      const item = normalizeItem(raw);
      // Support Strapi field name variations
      const title = item.Title || item.title || '';
      const department = item.Department || item.department || '';
      const description = item.Description || item.description || '';
      const applyLink = item.applyLink || item.ApplyLink || null;
      const slug = item.slug || item.Slug || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : String(item.id));
      const isActive = item.isActive !== undefined ? item.isActive : true;

      return {
        id: item.id || item.documentId,
        title,
        slug,
        department,
        location: item.location || item.Location || 'Kathmandu, Nepal',
        employmentType: item.employmentType || item.EmploymentType || 'Full-Time',
        deadline: item.deadline || item.Deadline || 'Open until filled',
        isActive,
        shortDesc: item.shortDesc || item.ShortDesc || (typeof description === 'string' ? description.slice(0, 160) : 'Join our team.'),
        description,
        responsibilities: item.responsibilities || item.Responsibilities || '',
        requirements: item.requirements || item.Requirements || '',
        applyLink: applyLink || `mailto:careers@adhikarigroup.com?subject=Application for ${title}`
      };
    });
  }
  return FALLBACK_VACANCIES;
}

export async function getVacancyBySlug(slug) {
  const vacancies = await getVacancies();
  return vacancies.find(v => v.slug === slug || String(v.id) === slug) || null;
}

// ---------------------- 8. POLICIES ----------------------
export async function getPolicies() {
  const res = await fetchStrapi('policies', { populate: '*' });
  if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map(raw => {
      const item = normalizeItem(raw);
      const title = item.title || item.Title || '';
      const slug = item.slug || item.Slug || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : String(item.id));
      return {
        id: item.id || item.documentId,
        title,
        slug,
        content: item.content || item.Content || ''
      };
    });
  }
  return FALLBACK_POLICIES;
}

export async function getPolicyBySlug(slug) {
  const policies = await getPolicies();
  return policies.find(p => p.slug === slug || String(p.id) === slug) || null;
}

// ---------------------- 9. CHAIRMAN & LEADERSHIP ----------------------
export async function getChairmanMessage() {
  const res = await fetchStrapi('chairman-message', { populate: '*' });
  if (res?.data) {
    const data = normalizeItem(res.data);
    return {
      name: extractPlainText(data.name || data.Name) || FALLBACK_CHAIRMAN.name,
      designation: extractPlainText(data.designation || data.Designation) || FALLBACK_CHAIRMAN.designation,
      photo: data.photo || FALLBACK_CHAIRMAN.photo,
      shortMessage: extractPlainText(data.shortMessage || data.ShortMessage) || FALLBACK_CHAIRMAN.shortMessage,
      fullMessage: data.fullMessage || data.FullMessage || FALLBACK_CHAIRMAN.fullMessage
    };
  }
  return FALLBACK_CHAIRMAN;
}

export async function getLeaders() {
  const res = await fetchStrapi('leaders', { populate: '*', sort: 'displayOrder:asc' });
  if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
    const leaders = res.data.map(raw => {
      const item = normalizeItem(raw);
      return {
        id: item.id || item.documentId,
        name: item.name || item.Name || '',
        position: item.position || item.Position || '',
        photo: item.photo || null,
        shortBio: item.shortBio || item.ShortBio || '',
        biography: item.biography || item.Biography || item.fullBio || '',
        displayOrder: item.displayOrder !== undefined ? item.displayOrder : 99
      };
    });
    return leaders.sort((a, b) => a.displayOrder - b.displayOrder);
  }
  return FALLBACK_LEADERS;
}

// ---------------------- 10. HOMEPAGE CONTENT ----------------------
export async function getHomepageContent() {
  const res = await fetchStrapi('homepage-content', { populate: '*' }) || await fetchStrapi('homepage', { populate: '*' });
  if (res?.data) {
    const data = normalizeItem(res.data);
    return {
      heroTitle: data.heroTitle || data.HeroTitle || FALLBACK_HOMEPAGE.heroTitle,
      heroSubtitle: data.heroSubtitle || data.HeroSubtitle || FALLBACK_HOMEPAGE.heroSubtitle,
      heroImage: data.heroImage || FALLBACK_HOMEPAGE.heroImage,
      heroVideo: data.heroVideo || FALLBACK_HOMEPAGE.heroVideo,
      aboutBadge: data.aboutBadge || data.AboutBadge || FALLBACK_HOMEPAGE.aboutBadge,
      aboutTitle: data.aboutTitle || data.AboutTitle || FALLBACK_HOMEPAGE.aboutTitle,
      aboutContent: data.aboutContent || data.AboutContent || FALLBACK_HOMEPAGE.aboutContent,
      businessesBadge: data.businessesBadge || data.BusinessesBadge || FALLBACK_HOMEPAGE.businessesBadge,
      businessesSectionTitle: data.businessesSectionTitle || data.BusinessesSectionTitle || FALLBACK_HOMEPAGE.businessesSectionTitle,
      businessesSectionSubtitle: data.businessesSectionSubtitle || data.BusinessesSectionSubtitle || FALLBACK_HOMEPAGE.businessesSectionSubtitle,
      brandsBadge: data.brandsBadge || data.BrandsBadge || FALLBACK_HOMEPAGE.brandsBadge,
      brandsSectionTitle: data.brandsSectionTitle || data.BrandsSectionTitle || FALLBACK_HOMEPAGE.brandsSectionTitle,
      brandsSectionSubtitle: data.brandsSectionSubtitle || data.BrandsSectionSubtitle || FALLBACK_HOMEPAGE.brandsSectionSubtitle,
      chairmanBadge: data.chairmanBadge || data.ChairmanBadge || FALLBACK_HOMEPAGE.chairmanBadge,
      chairmanSectionTitle: data.chairmanSectionTitle || data.ChairmanSectionTitle || FALLBACK_HOMEPAGE.chairmanSectionTitle,
      careersBadge: data.careersBadge || data.CareersBadge || FALLBACK_HOMEPAGE.careersBadge,
      careersTitle: data.careersTitle || data.CareersTitle || FALLBACK_HOMEPAGE.careersTitle,
      careersDescription: data.careersDescription || data.CareersDescription || FALLBACK_HOMEPAGE.careersDescription,
      contactCTATitle: data.contactCTATitle || data.ContactCTATitle || FALLBACK_HOMEPAGE.contactCTATitle,
      contactCTADescription: data.contactCTADescription || data.ContactCTADescription || FALLBACK_HOMEPAGE.contactCTADescription,
      stats: data.stats || FALLBACK_HOMEPAGE.stats
    };
  }
  return FALLBACK_HOMEPAGE;
}

// ---------------------- 11. CONTACT SUBMISSION ----------------------
export async function submitContactSubmission(formData) {
  // 1. Honeypot spam trap check: if bot filled hidden field, return silent success
  if (formData && formData.website_hp) {
    return { success: true };
  }

  const { website_hp, ...cleanData } = formData || {};

  // 2. Server-side validation
  const fullName = (cleanData.fullName || '').trim();
  const email = (cleanData.email || '').trim();
  const message = (cleanData.message || '').trim();
  const phone = (cleanData.phone || '').trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

  if (!fullName || fullName.length < 2) {
    return {
      success: false,
      error: 'Please provide your full name (minimum 2 characters).'
    };
  }

  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      error: 'Please enter a valid email address (e.g. name@organization.com).'
    };
  }

  if (phone && (phone.length < 7 || !phoneRegex.test(phone))) {
    return {
      success: false,
      error: 'Please enter a valid phone number.'
    };
  }

  if (!message || message.length < 10) {
    return {
      success: false,
      error: 'Please provide a detailed inquiry message (minimum 10 characters).'
    };
  }

  try {
    const endpointUrl = getStrapiURL('/api/contact-submissions');
    const res = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: cleanData }),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      // Technical details kept strictly for server / developer console logs
      console.error('Strapi contact submission error details:', res.status, errorJson);
      return {
        success: false,
        error: 'We were unable to process your inquiry right now. Please verify your details or reach out directly to info@adhikarigroup.com.'
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data?.data
    };
  } catch (err) {
    // Technical network exception logged for developers
    console.error('Network exception during contact submission:', err);
    return {
      success: false,
      error: 'Unable to connect to the server right now. Please check your internet connection and try again.'
    };
  }
}

