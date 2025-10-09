// Policy progress status types
export type PolicyStatus = 
  | 'no_activity'     // No legislation introduced
  | 'introduced'      // Bill introduced
  | 'committee'       // In committee review
  | 'passed_chamber'  // Passed one chamber
  | 'passed_both'     // Passed both chambers
  | 'signed'          // Signed into law
  | 'failed'          // Failed/rejected
  | 'studying'        // Under study/research

export interface PolicyProgress {
  id: string;
  name: string;
  status: PolicyStatus;
  lastUpdated: string;
  billNumber?: string;
  description?: string;
  nextStep?: string;
  sponsor?: string;
  voteCounts?: {
    yes: number;
    no: number;
    abstain: number;
  };
}

// North Carolina Counties Policy Progress
export const ncCountiesProgress: PolicyProgress[] = [
  // Major Urban Counties
  {
    id: 'mecklenburg',
    name: 'Mecklenburg County',
    status: 'studying',
    lastUpdated: '2024-03-15',
    description: 'Charlotte City Council exploring single-stair zoning amendments',
    nextStep: 'Public hearing scheduled for April 2024'
  },
  {
    id: 'wake',
    name: 'Wake County',
    status: 'committee',
    lastUpdated: '2024-03-10',
    billNumber: 'Local Bill 2024-15',
    description: 'Raleigh-specific single-stair pilot program proposal',
    nextStep: 'County commission vote expected March 2024'
  },
  {
    id: 'durham',
    name: 'Durham County',
    status: 'introduced',
    lastUpdated: '2024-02-28',
    billNumber: 'Ord-2024-08',
    description: 'Single-stair housing ordinance introduced',
    sponsor: 'Council Member Johnson'
  },
  {
    id: 'guilford',
    name: 'Guilford County',
    status: 'studying',
    lastUpdated: '2024-03-05',
    description: 'Greensboro planning department feasibility study',
    nextStep: 'Study completion expected May 2024'
  },
  {
    id: 'forsyth',
    name: 'Forsyth County',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'buncombe',
    name: 'Buncombe County',
    status: 'studying',
    lastUpdated: '2024-02-20',
    description: 'Asheville housing task force reviewing single-stair options',
    nextStep: 'Task force report due April 2024'
  },
  {
    id: 'gaston',
    name: 'Gaston County',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'iredell',
    name: 'Iredell County',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'cabarrus',
    name: 'Cabarrus County',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'union',
    name: 'Union County',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  // Additional counties can be added here
];

// US States Policy Progress
export const usStatesProgress: PolicyProgress[] = [
  // States with activity
  {
    id: 'nc',
    name: 'North Carolina',
    status: 'committee',
    lastUpdated: '2024-03-15',
    billNumber: 'HB 123',
    description: 'Single Stair Housing Act in committee review',
    nextStep: 'House committee vote expected March 2024',
    sponsor: 'Rep. Anderson'
  },
  {
    id: 'ca',
    name: 'California',
    status: 'signed',
    lastUpdated: '2024-01-15',
    billNumber: 'AB 2097',
    description: 'Single-stair buildings approved for residential use',
    nextStep: 'Implementation guidelines being developed'
  },
  {
    id: 'wa',
    name: 'Washington',
    status: 'passed_both',
    lastUpdated: '2024-02-28',
    billNumber: 'HB 1110',
    description: 'Single-stair housing bill passed legislature',
    nextStep: 'Awaiting governor signature'
  },
  {
    id: 'or',
    name: 'Oregon',
    status: 'committee',
    lastUpdated: '2024-03-01',
    billNumber: 'SB 458',
    description: 'Single-stair zoning reform in committee',
    nextStep: 'Public hearings scheduled'
  },
  {
    id: 'ny',
    name: 'New York',
    status: 'introduced',
    lastUpdated: '2024-02-15',
    billNumber: 'A 3847',
    description: 'Single-stair housing pilot program proposed',
    sponsor: 'Assembly Member Chen'
  },
  {
    id: 'ma',
    name: 'Massachusetts',
    status: 'studying',
    lastUpdated: '2024-03-10',
    description: 'Housing task force studying single-stair feasibility',
    nextStep: 'Report due June 2024'
  },
  {
    id: 'tx',
    name: 'Texas',
    status: 'introduced',
    lastUpdated: '2024-02-20',
    billNumber: 'HB 892',
    description: 'Single-stair buildings in urban areas',
    sponsor: 'Rep. Martinez'
  },
  {
    id: 'fl',
    name: 'Florida',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'co',
    name: 'Colorado',
    status: 'studying',
    lastUpdated: '2024-02-25',
    description: 'Denver planning commission reviewing options',
    nextStep: 'Commission meeting April 2024'
  },
  {
    id: 'ct',
    name: 'Connecticut',
    status: 'introduced',
    lastUpdated: '2024-03-05',
    billNumber: 'HB 5431',
    description: 'Single-stair housing pilot in New Haven',
    sponsor: 'Rep. Thompson'
  },
  // All other states default to no_activity
  {
    id: 'al',
    name: 'Alabama',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ak',
    name: 'Alaska',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'az',
    name: 'Arizona',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ar',
    name: 'Arkansas',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'de',
    name: 'Delaware',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ga',
    name: 'Georgia',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'hi',
    name: 'Hawaii',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'id',
    name: 'Idaho',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'il',
    name: 'Illinois',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'in',
    name: 'Indiana',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ia',
    name: 'Iowa',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ks',
    name: 'Kansas',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ky',
    name: 'Kentucky',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'la',
    name: 'Louisiana',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'me',
    name: 'Maine',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'md',
    name: 'Maryland',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'mi',
    name: 'Michigan',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'mn',
    name: 'Minnesota',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ms',
    name: 'Mississippi',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'mo',
    name: 'Missouri',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'mt',
    name: 'Montana',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ne',
    name: 'Nebraska',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'nv',
    name: 'Nevada',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'nh',
    name: 'New Hampshire',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'nj',
    name: 'New Jersey',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'nm',
    name: 'New Mexico',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'nd',
    name: 'North Dakota',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'oh',
    name: 'Ohio',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ok',
    name: 'Oklahoma',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'pa',
    name: 'Pennsylvania',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ri',
    name: 'Rhode Island',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'sc',
    name: 'South Carolina',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'sd',
    name: 'South Dakota',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'tn',
    name: 'Tennessee',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'ut',
    name: 'Utah',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'vt',
    name: 'Vermont',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'va',
    name: 'Virginia',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'wv',
    name: 'West Virginia',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'wi',
    name: 'Wisconsin',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'wy',
    name: 'Wyoming',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  },
  {
    id: 'dc',
    name: 'Washington D.C.',
    status: 'no_activity',
    lastUpdated: '2024-03-01',
    description: 'No current single-stair legislation'
  }
];

// Helper functions
export const getStatusColor = (status: PolicyStatus): string => {
  switch (status) {
    case 'signed': return 'var(--status-signed, #22c55e)';
    case 'passed_both': return 'var(--status-passed-both, #3b82f6)';
    case 'passed_chamber': return 'var(--status-passed-chamber, #6366f1)';
    case 'committee': return 'var(--status-committee, #f59e0b)';
    case 'introduced': return 'var(--status-introduced, #eab308)';
    case 'studying': return 'var(--status-studying, #8b5cf6)';
    case 'failed': return 'var(--status-failed, #ef4444)';
    case 'no_activity': return 'var(--status-no-activity, #9ca3af)';
    default: return 'var(--status-no-activity, #9ca3af)';
  }
};

export const getStatusLabel = (status: PolicyStatus): string => {
  switch (status) {
    case 'signed': return 'Signed into Law';
    case 'passed_both': return 'Passed Legislature';
    case 'passed_chamber': return 'Passed One Chamber';
    case 'committee': return 'In Committee';
    case 'introduced': return 'Bill Introduced';
    case 'studying': return 'Under Study';
    case 'failed': return 'Failed';
    case 'no_activity': return 'No Activity';
    default: return 'Unknown';
  }
};









