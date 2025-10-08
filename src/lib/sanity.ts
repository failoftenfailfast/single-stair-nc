import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

function getEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name];
    if (value && value.length > 0) return value;
  }
  return undefined;
}

// Support multiple env var conventions (Vercel + Sanity integration)
const projectId = getEnv(
  'SANITY_PROJECT_ID',
  'SANITY_API_PROJECT_ID',
  'SANITY_STUDIO_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_PROJECT_ID'
);

const dataset = getEnv(
  'SANITY_DATASET',
  'SANITY_API_DATASET',
  'SANITY_STUDIO_DATASET',
  'NEXT_PUBLIC_SANITY_DATASET'
);

const apiVersion = process.env.SANITY_API_VERSION || '2024-03-01';
const token = getEnv('SANITY_API_TOKEN', 'SANITY_API_READ_TOKEN', 'SANITY_API_WRITE_TOKEN');

if (!projectId || !dataset) {
  throw new Error('Missing Sanity configuration: projectId or dataset not set.');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ queries
export const queries = {
  // Homepage content
  homepage: `*[_type == "page" && slug.current == "home"][0]{
    title,
    description,
    scrollytellingSections[]->{
      _id,
      title,
      content,
      animationTrigger,
      cameraPosition,
      duration,
      models
    }
  }`,
  
  // Policy tracker
  policyTracker: `*[_type == "policyTracker"] | order(lastUpdated desc){
    _id,
    state,
    billNumber,
    status,
    lastUpdated,
    summary,
    nextSteps
  }`,
  
  // Legislators by district
  legislatorsByDistrict: (district: string) => `*[_type == "legislator" && district == "${district}"]{
    _id,
    name,
    title,
    district,
    email,
    phone,
    address,
    party,
    committees
  }`,
  
  // Building examples
  buildingExamples: `*[_type == "buildingExample"] | order(_createdAt desc){
    _id,
    name,
    location,
    architect,
    description,
    images,
    specifications
  }`,
  
  // Substack posts
  substackPosts: `*[_type == "substackPost"] | order(publishedAt desc)[0...6]{
    _id,
    title,
    excerpt,
    coverImage,
    canonicalUrl,
    publishedAt
  }`,
  
  // Site configuration
  siteConfig: `*[_type == "siteConfig"][0]{
    title,
    description,
    logo,
    socialLinks,
    contactInfo,
    letterTemplates
  }`,

  // Act page content
  actPage: `*[_type == "actPage"][0]{
    title,
    heroTitle,
    heroDescription,
    heroBackgroundImage,
    primaryButtonText,
    secondaryButtonText,
    seo
  }`,

  // About page content
  aboutPage: `*[_type == "aboutPage"][0]{
    title,
    heroTitle,
    heroDescription,
    missionTitle,
    missionContent,
    missionBulletPoints,
    whySingleStairTitle,
    whySingleStairBenefits,
    teamTitle,
    teamMembers,
    timelineTitle,
    timelineItems,
    ctaTitle,
    ctaDescription,
    primaryButtonText,
    secondaryButtonText,
    seo
  }`,

  // Contact page content
  contactPage: `*[_type == "contactPage"][0]{
    title,
    heroTitle,
    heroDescription,
    formTitle,
    inquiryTypes,
    submitButtonText,
    contactInfoTitle,
    contactInfoItems,
    officesTitle,
    officeLocations,
    followUsTitle,
    followUsDescription,
    socialLinks,
    seo
  }`,

  // Site settings
  siteSettings: `*[_type == "siteSettings"][0]{
    title,
    tagline,
    description,
    logo,
    favicon,
    navigation,
    ctaButton,
    footerBrandDescription,
    footerSections,
    newsletterTitle,
    newsletterDescription,
    newsletterButtonText,
    socialLinks,
    footerBottomLinks,
    copyrightText,
    seo
  }`
};


