import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Use hardcoded values for client-side compatibility
const projectId = 'n8639pbu';
const dataset = 'production';
const apiVersion = '2024-03-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
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

  // Policy tracker - states
  policyStates: `*[_type == "policyTracker" && level == "state"] | order(name asc){
    _id,
    id,
    name,
    status,
    lastUpdated,
    billNumber,
    description,
    nextStep,
    sponsor
  }`,

  // Policy tracker - NC counties
  policyCountiesNC: `*[_type == "policyTracker" && level == "county" && stateId == "nc"] | order(name asc){
    _id,
    id,
    name,
    status,
    lastUpdated,
    billNumber,
    description,
    nextStep,
    sponsor,
    stateId
  }`,

  // Policy updates (recent)
  policyUpdatesNC: `*[_type == "policyUpdate" && scope == "nc"] | order(date desc)[0...10]{
    _id,
    date,
    locationName,
    title,
    description,
    statusKind,
    billNumber,
    link
  }`,
  policyUpdatesNational: `*[_type == "policyUpdate" && scope == "national"] | order(date desc)[0...10]{
    _id,
    date,
    locationName,
    title,
    description,
    statusKind,
    billNumber,
    link
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

  // Act page content (prefer most recently updated doc to avoid picking older duplicates)
  actPage: `*[_type == "actPage"] | order(_updatedAt desc)[0]{
    title,
    heroTitle,
    heroDescription,
    heroBackgroundImage{
      ...,
      asset->
    },
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
    theme,
    copyrightText,
    seo
  }`
};


