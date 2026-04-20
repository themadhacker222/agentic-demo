import { PartnerConfig } from '../types/models';

export const partnerConfig: PartnerConfig = {
  partnerId: 1,
  name: 'TravelCo',
  caps: {
    Hotel: { max: 3, exclusions: ['Airport'] },
    Flight: { max: 5, exclusions: [] },
    Activity: { max: 2, exclusions: ['Airport'] },
  },
};