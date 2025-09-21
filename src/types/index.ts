// Sanity document types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface BlockContent {
  _type: 'block';
  _key: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  style?: string;
  markDefs?: any[];
}

// Site Configuration
export interface SiteConfig extends SanityDocument {
  title: string;
  description: string;
  logo?: SanityImage;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  contactInfo: {
    email: string;
    phone?: string;
    address?: string;
  };
  letterTemplates: LetterTemplate[];
}

// Page Types
export interface Page extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  content?: BlockContent[];
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
}

// Scrollytelling
export interface ScrollytellingSection extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  order: number;
  content: BlockContent[];
  animationTrigger: 'fadeIn' | 'slideUp' | 'scale' | 'rotate' | 'morph' | 'cameraMove';
  cameraPosition: {
    x: number;
    y: number;
    z: number;
  };
  cameraTarget?: {
    x: number;
    y: number;
    z: number;
  };
  duration: number;
  models: string[];
  modelStates?: {
    opacity?: number;
    scale?: number;
    rotation?: {
      x: number;
      y: number;
      z: number;
    };
    position?: {
      x: number;
      y: number;
      z: number;
    };
  };
  backgroundColor?: {
    hex: string;
    alpha: number;
  };
  isActive: boolean;
}

// Policy Tracking
export interface PolicyTracker extends SanityDocument {
  state: string;
  billNumber: string;
  status: 'introduced' | 'committee' | 'passed_house' | 'passed_senate' | 'signed' | 'failed';
  lastUpdated: string;
  summary: string;
  nextSteps?: BlockContent[];
  sponsor?: string;
  coSponsors?: string[];
  committees?: string[];
  votes?: {
    chamber: 'house' | 'senate';
    date: string;
    result: 'pass' | 'fail';
    voteCounts: {
      yes: number;
      no: number;
      abstain: number;
    };
  }[];
}

// Legislators
export interface Legislator extends SanityDocument {
  name: string;
  title: string;
  district: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  party: 'Democrat' | 'Republican' | 'Independent' | 'Other';
  committees?: string[];
  website?: string;
  socialMedia?: {
    platform: string;
    handle: string;
    url: string;
  }[];
  photo?: SanityImage;
  bio?: BlockContent[];
}

// Districts
export interface District extends SanityDocument {
  name: string;
  type: 'house' | 'senate' | 'congressional';
  number: string;
  boundaries?: any; // GeoJSON
  population?: number;
  demographics?: {
    totalPopulation: number;
    medianAge: number;
    medianIncome: number;
    housingUnits: number;
  };
}

// Building Examples
export interface BuildingExample extends SanityDocument {
  name: string;
  location: string;
  architect?: string;
  description: BlockContent[];
  images: SanityImage[];
  specifications: {
    floors: number;
    units: number;
    yearCompleted: number;
    buildingType: string;
    certifications?: string[];
  };
  features?: string[];
  website?: string;
  isActive: boolean;
}

// Letter Templates
export interface LetterTemplate extends SanityDocument {
  name: string;
  subject: string;
  body: BlockContent[];
  targetAudience: 'state_rep' | 'state_senator' | 'governor' | 'local_official';
  tags?: string[];
  isActive: boolean;
}

// Call to Actions
export interface CallToAction extends SanityDocument {
  title: string;
  description: BlockContent[];
  buttonText: string;
  buttonUrl?: string;
  type: 'email' | 'phone' | 'form' | 'external_link';
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
}

// External Content
export interface SubstackPost extends SanityDocument {
  title: string;
  excerpt: string;
  coverImage?: SanityImage;
  canonicalUrl: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
}

// FAQ Items
export interface FaqItem extends SanityDocument {
  question: string;
  answer: BlockContent[];
  category?: string;
  order?: number;
  isActive: boolean;
}

// Articles
export interface Article extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: BlockContent[];
  featuredImage?: SanityImage;
  author?: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
  };
  isPublished: boolean;
}

// Legislation Checklist
export interface LegislationChecklist extends SanityDocument {
  title: string;
  description: BlockContent[];
  items: {
    _key: string;
    text: string;
    description?: string;
    isRequired: boolean;
    category?: string;
  }[];
  lastUpdated: string;
  version: string;
}

// 3D Scene Types
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface CameraState {
  position: Vector3;
  target: Vector3;
  fov?: number;
}

export interface ModelState {
  visible: boolean;
  opacity: number;
  position: Vector3;
  rotation: Vector3;
  scale: number | Vector3;
}

export interface SceneState {
  camera: CameraState;
  models: Record<string, ModelState>;
  lighting?: {
    ambientIntensity: number;
    directionalIntensity: number;
    directionalPosition: Vector3;
  };
  backgroundColor?: string;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'press' | 'partnership' | 'technical';
}

export interface LegislatorContactForm {
  voterName: string;
  voterEmail: string;
  voterAddress: string;
  voterPhone?: string;
  subject: string;
  message: string;
  templateId?: string;
  legislatorIds: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface GeocodeResponse {
  coordinates: [number, number]; // [lng, lat]
  address: string;
  district?: {
    house: string;
    senate: string;
    congressional: string;
  };
}

// Hook Types
export interface UseScrollytellingReturn {
  currentSection: number;
  progress: number;
  isInView: boolean;
  sectionRefs: (HTMLDivElement | null)[];
  setRef: (index: number) => (el: HTMLDivElement | null) => void;
}


