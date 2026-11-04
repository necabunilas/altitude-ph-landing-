// Business details used by the page and the SEO metadata. Set NEXT_PUBLIC_SITE_URL
// once the site has a live domain; canonical and structured data URLs depend on it.
export const SITE = {
  name: 'altitude.cc',
  tagline: 'Coffee, brewed up high.',
  description:
    'A coffee shop and community hub in Malaybalay City, Bukidnon. Your pit stop for cycling, running, and the outdoors.',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  street: '2nd floor, LLK Building, Sayre Hwy',
  city: 'Malaybalay City',
  province: 'Bukidnon',
  phone: '+63 961 054 9635',
  phoneHref: 'tel:+639610549635',
  geo: { latitude: 8.129179, longitude: 125.1284403 },
  mapsUrl: 'https://maps.app.goo.gl/wWdmJE9uFvU97RfJ9',
  // Pinned by coordinates: Google's place embed still shows the old name and address.
  mapsEmbedUrl: 'https://maps.google.com/maps?q=8.129179,125.1284403&z=16&output=embed',
  facebook: 'https://www.facebook.com/altitudecoffeeph',
  instagram: 'https://www.instagram.com/altitude.cc/',
  messenger: 'https://www.facebook.com/messages/t/100083265109805',
};

type DayHours = { day: string; short: string; open: number | null; close: number | null };

// Indexed like Date.getDay(), 0 = Sunday. Times are 24-hour decimals (6.5 = 6:30), Manila time.
export const HOURS: DayHours[] = [
  { day: 'Sunday', short: 'Sun', open: 14, close: 19 },
  { day: 'Monday', short: 'Mon', open: 6.5, close: 19 },
  { day: 'Tuesday', short: 'Tue', open: 6.5, close: 19 },
  { day: 'Wednesday', short: 'Wed', open: 6.5, close: 19 },
  { day: 'Thursday', short: 'Thu', open: 6.5, close: 19 },
  { day: 'Friday', short: 'Fri', open: 6.5, close: 19 },
  { day: 'Saturday', short: 'Sat', open: 6.5, close: 19 },
];

const pad = (n: number) => String(n).padStart(2, '0');
const minutesOf = (time: number) => Math.round((time % 1) * 60);

export const formatHour = (time: number) => {
  const hour = Math.floor(time);
  const minutes = minutesOf(time);
  return `${hour % 12 || 12}${minutes ? `:${pad(minutes)}` : ''} ${hour < 12 ? 'AM' : 'PM'}`;
};

// HH:MM, as schema.org opening hours expect.
export const formatTime24 = (time: number) => `${pad(Math.floor(time))}:${pad(minutesOf(time))}`;

export type StoreStatus = { isOpen: boolean; label: string; today: number };

// Always evaluated in Manila time so visitors abroad see the shop's real status.
export function getStoreStatus(now = new Date()): StoreStatus {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const today = HOURS.findIndex((h) => h.short === part('weekday'));
  const time = Number(part('hour')) + Number(part('minute')) / 60;

  const { open, close } = HOURS[today];
  if (open !== null && close !== null && time >= open && time < close) {
    return { isOpen: true, label: `Open until ${formatHour(close)}`, today };
  }

  for (let offset = 0; offset < 7; offset++) {
    const next = HOURS[(today + offset) % 7];
    if (next.open === null || (offset === 0 && time >= next.open)) continue;
    const when = offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : next.short;
    return { isOpen: false, label: `Closed, opens ${when} at ${formatHour(next.open)}`, today };
  }
  return { isOpen: false, label: 'Closed', today };
}
