/**
 * Date Utilities
 * Persian (Jalali) date formatting and utilities
 */

// Persian numbers map
const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

// Persian weekday names
const persianWeekdays = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

// Persian month names
const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

/**
 * Convert English digit to Persian digit
 */
function toPersianDigit(num: number | string): string {
  return num
    .toString()
    .split("")
    .map((d) => (/\d/.test(d) ? persianNumbers[parseInt(d)] : d))
    .join("");
}

/**
 * Convert a Gregorian date to Persian (Jalali) date
 */
export function gregorianToPersian(date: Date): {
  year: number;
  month: number;
  day: number;
  weekday: number;
} {
  // JDN (Julian Day Number) calculation
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Calculate JDN
  const jd =
    (1461 * (year + 4800 + (month - 14) / 12)) / 4 +
    (367 * (month - 2 - 12 * ((month - 14) / 12))) / 12 -
    (3 * ((year + 4900 + (month - 14) / 12) / 100)) / 4 +
    day -
    32075;

  // Convert JDN to Persian date
  const jdn = jd;
  const PersianEpoch = 1948320.5;

  const depoch = jdn - PersianEpoch;
  const cycle = Math.floor(depoch / 1029983);
  const cyear = depoch % 1029983;

  let ycycle: number;
  if (cyear === 1029982) {
    ycycle = 2820;
  } else {
    const aux1 = Math.floor(cyear / 366);
    const aux2 = cyear % 366;
    ycycle = Math.floor((2810 * aux1 + 2818 * aux2) / 1029982);
    const yday =
      aux1 + aux2 - Math.floor((2818 * aux1 + 2818 * aux2) / 1029982);
    ycycle = aux1 + Math.floor(yday / 366);
  }

  let yearPersian = ycycle + 2820 * cycle + 474;
  let monthPersian: number;

  if (yearPersian <= 0) {
    yearPersian--;
  }

  const yday = jdn - persianToJDN(yearPersian, 1, 1) + 1;
  monthPersian =
    yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);

  const dayPersian = jdn - persianToJDN(yearPersian, monthPersian, 1) + 1;

  // Calculate weekday (0 = Saturday in this system)
  const weekday = (jdn + 2) % 7;

  return {
    year: yearPersian,
    month: monthPersian,
    day: dayPersian,
    weekday: weekday,
  };
}

/**
 * Helper function to calculate JDN for Persian date
 */
function persianToJDN(year: number, month: number, day: number): number {
  const PersianEpoch = 1948320.5;
  const yearOffset = year - 474;
  const normalizedYear = 474 + (yearOffset % 2820);

  let jdn =
    day +
    (month <= 7 ? (month - 1) * 31 : (month - 7) * 30 + 6) +
    Math.floor((normalizedYear * 682) / 2817) -
    1 +
    PersianEpoch +
    474 * 365 +
    Math.floor(474 / 4) * 1 +
    Math.floor(474 / 100) * -1 +
    Math.floor(474 / 400) * 1;

  return jdn;
}

/**
 * Format date to Persian string (e.g., "۱۴۰۳/۵/۶")
 */
export function formatPersianDate(date: Date = new Date()): string {
  const persian = gregorianToPersian(date);
  const formatted = `${persian.year}/${persian.month}/${persian.day}`;
  return toPersianDigit(formatted);
}

/**
 * Format time to Persian string (e.g., "۱۴:۳۰")
 */
export function formatPersianTime(date: Date = new Date()): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formatted = `${hours}:${minutes}`;
  return toPersianDigit(formatted);
}

/**
 * Format weekday to Persian string (e.g., "شنبه")
 */
export function formatPersianWeekday(date: Date = new Date()): string {
  const persian = gregorianToPersian(date);
  return persianWeekdays[persian.weekday];
}

/**
 * Format full Persian date with weekday (e.g., "۱۴۰۳/۵/۶ - شنبه")
 */
export function formatFullPersianDate(date: Date = new Date()): string {
  const persian = gregorianToPersian(date);
  const formatted = `${persian.year}/${persian.month}/${persian.day}`;
  return `${toPersianDigit(formatted)} - ${persianWeekdays[persian.weekday]}`;
}

/**
 * Get current Persian date info
 */
export function getPersianDateInfo(date: Date = new Date()): {
  date: string;
  time: string;
  weekday: string;
  full: string;
} {
  return {
    date: formatPersianDate(date),
    time: formatPersianTime(date),
    weekday: formatPersianWeekday(date),
    full: formatFullPersianDate(date),
  };
}

/**
 * Check if today is Friday (weekend in Iran)
 */
export function isFriday(date: Date = new Date()): boolean {
  // getDay() returns 0 for Sunday, 5 for Friday in Gregorian
  return date.getDay() === 5;
}

/**
 * Check if today is Thursday (half-day in Iran)
 */
export function isThursday(date: Date = new Date()): boolean {
  return date.getDay() === 4;
}
