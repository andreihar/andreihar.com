import { location } from '@/data/values';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function getLocationArray(locale: string) {
  const t = await getTranslations({ locale, namespace: 'Values' });
  const regionCode = location[location.length - 1];
  const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
  const localisedCity = t(location[0]);
  const localisedRegion = displayNames.of(regionCode) ?? regionCode;

  return [localisedCity, ...location.slice(1, -1), localisedRegion];
}

export function getLocation() {
  const locale = useLocale();
  const t = useTranslations('Values');
  const regionCode = location[location.length - 1];
  const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
  const localisedCity = t(location[0]);
  const localisedRegion = displayNames.of(regionCode) ?? regionCode;

  return [localisedCity, ...location.slice(1, -1), localisedRegion].join(', ');
}