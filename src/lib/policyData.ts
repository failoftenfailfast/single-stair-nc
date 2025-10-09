'use client';

import { client, queries } from '@/lib/sanity';
import { PolicyProgress, usStatesProgress, ncCountiesProgress } from '@/data/policyProgress';

function mapSanityToPolicyProgress(doc: any): PolicyProgress {
  return {
    id: doc.id || doc._id,
    name: doc.name,
    status: doc.status,
    lastUpdated: doc.lastUpdated,
    billNumber: doc.billNumber,
    description: doc.description,
    nextStep: doc.nextStep,
    sponsor: doc.sponsor,
  } as PolicyProgress;
}

function mergeById(base: PolicyProgress[], overrides: PolicyProgress[]): PolicyProgress[] {
  const byId: Record<string, PolicyProgress> = {};
  for (const item of base) {
    byId[item.id] = item;
  }
  for (const item of overrides) {
    byId[item.id] = { ...byId[item.id], ...item };
  }
  return Object.values(byId);
}

export async function fetchPolicyStates(): Promise<PolicyProgress[]> {
  try {
    const docs = await client.fetch(queries.policyStates);
    const cms = (docs || []).map(mapSanityToPolicyProgress);
    if (!cms || cms.length === 0) return usStatesProgress;
    return mergeById(usStatesProgress, cms);
  } catch (err) {
    return usStatesProgress;
  }
}

export async function fetchPolicyNCCounties(): Promise<PolicyProgress[]> {
  try {
    const docs = await client.fetch(queries.policyCountiesNC);
    const cms = (docs || []).map(mapSanityToPolicyProgress);
    if (!cms || cms.length === 0) return ncCountiesProgress;
    return mergeById(ncCountiesProgress, cms);
  } catch (err) {
    return ncCountiesProgress;
  }
}


