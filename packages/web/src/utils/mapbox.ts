const tuple = <T extends string>(...args: T[]) => args;

export const themesNames = tuple(
  'streets-v11',
  'outdoors-v11',
  'light-v10',
  'dark-v10',
  'satellite-v9',
  'satellite-streets-v11',
  'navigation-preview-day-v4',
  'navigation-preview-night-v4',
  'navigation-guidance-day-v4',
  'navigation-guidance-night-v4',
);

export type Theme = (typeof themesNames)[number]

export default {
  url(theme: Theme = 'light-v10') {
    const start = 'https://api.mapbox.com/styles/v1/mapbox/'
    const end = '/tiles/256/{z}/{x}/{y}?access_token=';
    return `${start}${theme}${end}${process.env.REACT_APP_MAPBOX_TOKEN}`;
  }
}