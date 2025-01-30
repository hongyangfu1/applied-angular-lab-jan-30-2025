import { http, HttpResponse } from 'msw';

const FEATURES_ENABLED_DURING_DEV = [
  'golf',
  'alt-prefs',
  'jeff-experiment',
  'hong-experiment',
];
export const Feature_Handlers = [
  http.get('https://flagr.p.com/api/features', () => {
    return HttpResponse.json(FEATURES_ENABLED_DURING_DEV);
  }),
];
