import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || '2024-03-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
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
  }`
};


