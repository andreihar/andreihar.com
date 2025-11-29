import { location } from '@/data/values';
import { useLocale } from 'next-intl';

export function getLocationArray(locale: string) {
  const regionCode = location[location.length - 1];
  const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
  const localisedRegion = displayNames.of(regionCode) ?? regionCode;

  return [...location.slice(0, -1), localisedRegion];
}

export function getLocation() {
  const locale = useLocale();
  return getLocationArray(locale).join(', ');
}