#!/usr/bin/env node

/*
  Agentic Travel CLI
  ------------------
  1) Pull member profile
  2) Pull recommendations
  3) Print nicely formatted output
*/

import fetch from 'node-fetch';
import { Member, TravelItem } from '../types/models';

const baseUrl = 'http://localhost:3000';

async function getMemberProfile(memberId: number): Promise<Member> {
  const res = await fetch(`${baseUrl}/mcp/get_member_profile?memberId=${memberId}`);
  const data = await res.json();
  return data as Member;
}

async function getRecommendations(memberId: number, limit = 5): Promise<TravelItem[]> {
  const res = await fetch(`${baseUrl}/mcp/get_recommendations?memberId=${memberId}&limit=${limit}`);
  const data = await res.json();
  return data as TravelItem[];
}

async function run(memberId: number) {
  console.log('🔍 Fetching member profile…');
  const member = await getMemberProfile(memberId);
  console.log(`• ${member.name} (${member.email})`);

  console.log('📄 Fetching recommendations…');
  const recs = await getRecommendations(memberId, 5);
  recs.forEach((r, index) => {
    console.log(`  ${index + 1}. [${r.category}] ${r.title} – Score: ${r.score.toFixed(2)}`);
  });
}

// Run with node --inspect src/client/cli.ts <memberId>
(async () => {
  const memberId = process.argv[2] ? Number(process.argv[2]) : 1;
  await run(memberId);
})();