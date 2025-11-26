export function normalizeLocation(loc: any) {
  return {
    country: loc?.country || null,
    region: loc?.region || null,
    city: loc?.city || null,
    lat: loc?.lat || null,
    lon: loc?.lon || null,
  };
}
