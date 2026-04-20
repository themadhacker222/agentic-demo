import { TravelItem } from '../types/models';

export const travels: TravelItem[] = [
  // Alice
  { id: 100, memberId: 1, category: 'Hotel', title: 'Grand Plaza', score: 0.86, categoryOrder: 1 },
  { id: 101, memberId: 1, category: 'Flight', title: 'NYC → LA', score: 0.92, categoryOrder: 2 },
  { id: 102, memberId: 1, category: 'Activity', title: 'Brewery Tour', score: 0.78, categoryOrder: 3 },
  // Bob
  { id: 200, memberId: 2, category: 'Hotel', title: 'The Ritz', score: 0.90, categoryOrder: 1 },
  { id: 201, memberId: 2, category: 'Flight', title: 'Toronto → Vancouver', score: 0.94, categoryOrder: 2 },
  { id: 202, memberId: 2, category: 'Activity', title: 'Hiking', score: 0.81, categoryOrder: 3 },
];