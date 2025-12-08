import { location } from '@/data/values';
import { routing } from '@/i18n/routing';

export async function fetchWikiCity(locale: string, city: string) {
  const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&sites=${routing.defaultLocale}wiki&titles=${encodeURIComponent(city)}&languages=${locale}&format=json&origin=*`;
  const res = await fetch(url);
  const data = await res.json();

  const entities = data.entities;
  if (entities) {
    const entity = Object.values(entities)[0] as { labels?: Record<string, { value: string; }>; };
    if (entity?.labels?.[locale]?.value) {
      return entity.labels[locale].value;
    }
  }
  // Fallback to original city name
  return city;
}

export async function getLocation(locale: string) {
  const regionCode = location[location.length - 1];
  const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
  const localisedRegion = displayNames.of(regionCode) ?? regionCode;
  const localisedCity = await fetchWikiCity(locale, location[0]);

  return [localisedCity, ...location.slice(1, -1), localisedRegion];
}