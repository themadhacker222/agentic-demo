import { Request, Response } from 'express';
import { Member, TravelItem } from '../types/models';
import { members } from '../data/memberData';
import { travels } from '../data/travelData';
import { partnerConfig } from '../data/partnerConfig';

/* ------------------------------------------------------------------ */
/* 1) get_member_profile
/* ------------------------------------------------------------------ */

export const getMemberProfile = async (req: Request, res: Response) => {
  const memberId = Number(req.query.memberId);

  const member = members.find((m) => m.id === memberId);
  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }

  res.json(member);
};

/* ------------------------------------------------------------------ */
/* 2) get_recommendations
/* ------------------------------------------------------------------ */

export const getRecommendations = async (req: Request, res: Response) => {
  const memberId = Number(req.query.memberId);
  const limit = Number(req.query.limit) || 5; // default to 5 items

  // 1️⃣ Pull all travels for the member
  const memberTravels = travels.filter((t) => t.memberId === memberId);

  // 2️⃣ Group by category, respecting partner caps & exclusions
  const grouped = memberTravels.reduce<Record<string, TravelItem[]>>((acc, t) => {
    const cap = partnerConfig.caps[t.category]?.max ?? 3;
    const exclusions = partnerConfig.caps[t.category]?.exclusions ?? [];

    // if the category is not in config, skip
    if (!acc[t.category]) {
      acc[t.category] = [];
    }

    // sort by score descending, then by categoryOrder ascending
    acc[t.category].push(t);

    return acc;
  }, {});

  // 3️⃣ Apply caps
  const cappedGroups: Record<string, TravelItem[]> = Object.entries(grouped).reduce(
    (acc, [category, items]) => {
      const max = partnerConfig.caps[category]?.max ?? 3;
      // Filter out any excluded category names if needed
      const filtered = items
        .filter((i) => !partnerConfig.caps[category]?.exclusions?.includes(i.category))
        .sort((a, b) => b.score - a.score) // best score first
        .slice(0, Math.min(max, limit));    // enforce max cap per category

      acc[category] = filtered;
      return acc;
    },
    {} as Record<string, TravelItem[]>
  );

  // 4️⃣ Flatten to single array, sort by categoryOrder, then by score
  const recommendations = Object.entries(cappedGroups)
    .flatMap(([category, items]) => items)
    .sort((a, b) => a.categoryOrder - b.categoryOrder);

  res.json(recommendations);
};