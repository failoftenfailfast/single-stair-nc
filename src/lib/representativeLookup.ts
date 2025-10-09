// Representative lookup service for North Carolina advocacy
// Handles address geocoding, district matching, and representative data

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface District {
  id: string;
  name: string;
  type: 'state_house' | 'state_senate' | 'us_house' | 'local';
  boundary?: any; // GeoJSON boundary data
}

export interface Legislator {
  id: string;
  name: string;
  title: string;
  party: 'D' | 'R' | 'I' | 'Other';
  district: string;
  chamber: string;
  contact: {
    email?: string;
    phone?: string;
    officePhone?: string;
    website?: string;
    mailingAddress?: string;
  };
  committees?: string[];
  priority: number;
  singleStairPosition?: 'strong_support' | 'support' | 'neutral' | 'oppose' | 'strong_oppose';
  socialMedia?: {
    platform: string;
    handle: string;
    url: string;
  }[];
}

export interface RepresentativeLookupResult {
  address: Address;
  coordinates: Coordinates;
  districts: District[];
  legislators: Legislator[];
  success: boolean;
  error?: string;
}

// Geocoding service using OpenStreetMap Nominatim (free alternative to Google Maps)
export class GeocodingService {
  private static readonly NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
  
  // Lightweight suggestion item for address autocompletion
  static async suggestAddresses(query: string): Promise<{ label: string; value: string }[]> {
    const trimmed = query.trim();
    if (trimmed.length < 3) return [];
    try {
      const url = `${this.NOMINATIM_URL}?q=${encodeURIComponent(trimmed)}&format=json&addressdetails=1&limit=5&countrycodes=us&state=north%20carolina`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        return [];
      }

      const results: any[] = await response.json();

      // Ensure results are within North Carolina; extra guard in case API returns broader matches
      const suggestions = results
        .filter((r) => {
          const state = r?.address?.state || '';
          const display = (r?.display_name || '') as string;
          return state.toLowerCase() === 'north carolina' || display.toLowerCase().includes('north carolina');
        })
        .map((r) => {
          // Prefer constructing a concise label: street, city, NC zip
          const houseNumber = r?.address?.house_number ? `${r.address.house_number} ` : '';
          const road = r?.address?.road || r?.address?.pedestrian || r?.address?.footway || '';
          const city = r?.address?.city || r?.address?.town || r?.address?.village || r?.address?.hamlet || '';
          const postcode = r?.address?.postcode || '';
          const parts = [
            `${houseNumber}${road}`.trim(),
            city,
            'NC',
            postcode,
          ].filter(Boolean);
          const label = parts.join(', ');
          const value = label || (r?.display_name as string);
          return { label: value, value };
        });

      // De-duplicate by value
      const seen = new Set<string>();
      const unique: { label: string; value: string }[] = [];
      for (const s of suggestions) {
        if (!seen.has(s.value)) {
          seen.add(s.value);
          unique.push(s);
        }
      }
      return unique;
    } catch {
      return [];
    }
  }

  static async geocodeAddress(address: string): Promise<Coordinates | null> {
    try {
      const query = encodeURIComponent(address + ', North Carolina, USA');
      const response = await fetch(
        `${this.NOMINATIM_URL}?q=${query}&format=json&limit=1&countrycodes=us&state=north%20carolina`
      );

      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }

      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }
}

// North Carolina district boundaries and lookup
export class NCDistrictService {
  private static ncDistricts: Map<string, District> = new Map();

  // Initialize with NC district data
  static initializeDistricts() {
    // This would typically load from a comprehensive NC districts GeoJSON file
    // For now, we'll use a simplified approach with known district mappings
    this.ncDistricts.set('state_house_1', {
      id: 'state_house_1',
      name: 'House District 1',
      type: 'state_house',
    });

    // Add more districts as needed
  }

  static getDistrictsForCoordinate(coordinates: Coordinates): District[] {
    // This would implement point-in-polygon logic with actual district boundaries
    // For now, return a sample set
    return [
      {
        id: 'state_house_12',
        name: 'House District 12',
        type: 'state_house',
      },
      {
        id: 'state_senate_5',
        name: 'Senate District 5',
        type: 'state_senate',
      },
    ];
  }
}

// Main representative lookup service
export class RepresentativeLookupService {
  static async lookupRepresentatives(address: string): Promise<RepresentativeLookupResult> {
    try {
      // Parse address
      const parsedAddress = this.parseAddress(address);
      if (!parsedAddress) {
        return {
          address: { street: '', city: '', state: '', zipCode: '' },
          coordinates: { lat: 0, lng: 0 },
          districts: [],
          legislators: [],
          success: false,
          error: 'Invalid address format',
        };
      }

      // Geocode address
      const coordinates = await GeocodingService.geocodeAddress(address);
      if (!coordinates) {
        return {
          address: parsedAddress,
          coordinates: { lat: 0, lng: 0 },
          districts: [],
          legislators: [],
          success: false,
          error: 'Could not geocode address',
        };
      }

      // Find districts
      NCDistrictService.initializeDistricts();
      const districts = NCDistrictService.getDistrictsForCoordinate(coordinates);

      // Get legislators for districts
      const legislators = await this.getLegislatorsForDistricts(districts);

      return {
        address: parsedAddress,
        coordinates,
        districts,
        legislators,
        success: true,
      };
    } catch (error) {
      console.error('Representative lookup error:', error);
      return {
        address: { street: '', city: '', state: '', zipCode: '' },
        coordinates: { lat: 0, lng: 0 },
        districts: [],
        legislators: [],
        success: false,
        error: 'Service error occurred',
      };
    }
  }

  private static parseAddress(address: string): Address | null {
    // Simple address parsing - in production, use a proper address parsing library
    const parts = address.split(',').map(part => part.trim());

    if (parts.length < 2) return null;

    const street = parts[0];
    const city = parts[1];
    const stateZip = parts[2]?.split(' ') || [];

    return {
      street,
      city,
      state: 'NC',
      zipCode: stateZip[stateZip.length - 1] || '',
    };
  }

  private static async getLegislatorsForDistricts(districts: District[]): Promise<Legislator[]> {
    // This would typically fetch from a database or API
    // For now, return sample data based on districts
    const legislators: Legislator[] = [];

    for (const district of districts) {
      if (district.type === 'state_house') {
        legislators.push({
          id: `rep_${district.id}`,
          name: 'Jane Smith',
          title: 'State Representative',
          party: 'D',
          district: district.name,
          chamber: 'NC House',
          contact: {
            email: 'jane.smith@ncleg.gov',
            phone: '(919) 555-0123',
            website: 'https://ncleg.gov/Representatives/Smith',
          },
          priority: 4,
          singleStairPosition: 'support',
        });
      } else if (district.type === 'state_senate') {
        legislators.push({
          id: `sen_${district.id}`,
          name: 'John Doe',
          title: 'State Senator',
          party: 'R',
          district: district.name,
          chamber: 'NC Senate',
          contact: {
            email: 'john.doe@ncleg.gov',
            phone: '(919) 555-0456',
            website: 'https://ncleg.gov/Senators/Doe',
          },
          priority: 3,
          singleStairPosition: 'neutral',
        });
      }
    }

    return legislators;
  }
}

// Message template system for advocacy
export interface MessageTemplate {
  id: string;
  title: string;
  subject: string;
  body: string;
  category: 'email' | 'letter' | 'phone_script';
  tone: 'formal' | 'personal' | 'urgent';
}

export class MessageTemplateService {
  static getTemplates(): MessageTemplate[] {
    return [
      {
        id: 'single_stair_support',
        title: 'Support Single-Stair Housing',
        subject: 'Please Support Single-Stair Housing Legislation',
        body: `Dear [REPRESENTATIVE_NAME],

I am writing as a constituent in [DISTRICT] to urge your support for single-stair housing legislation. Single-stair buildings offer numerous benefits including increased housing density, reduced construction costs, and improved accessibility.

As our community faces a housing shortage, single-stair housing represents an innovative solution that can help address our growing needs while maintaining safety standards.

I kindly request that you:
1. Support any single-stair housing bills in committee
2. Co-sponsor legislation that promotes this housing type
3. Work with your colleagues to advance these important reforms

Thank you for your time and consideration of this important issue.

Sincerely,
[USER_NAME]`,
        category: 'email',
        tone: 'formal',
      },
      {
        id: 'local_housing_concerns',
        title: 'Local Housing Concerns',
        subject: 'Addressing Housing Affordability in Our Community',
        body: `Dear [REPRESENTATIVE_NAME],

I'm reaching out as a resident of [CITY] concerned about housing affordability in our area. I've been following the discussions around single-stair housing and believe this could be part of the solution to our housing challenges.

Could we schedule a brief meeting to discuss how single-stair housing might benefit [CITY_COUNTY]?

Best regards,
[USER_NAME]`,
        category: 'email',
        tone: 'personal',
      },
    ];
  }

  static formatTemplate(template: MessageTemplate, userName: string, representativeName: string, district: string, city: string): string {
    return template.body
      .replace(/\[USER_NAME\]/g, userName)
      .replace(/\[REPRESENTATIVE_NAME\]/g, representativeName)
      .replace(/\[DISTRICT\]/g, district)
      .replace(/\[CITY\]/g, city)
      .replace(/\[CITY_COUNTY\]/g, city);
  }
}
