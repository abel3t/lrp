import { format, formatDistance, getUnixTime } from 'date-fns';

import { NotApplicable } from '../contanst';

export const getUtcDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return new Date(Date.UTC(year, month, day, 0, 0, 0));
};

export const isValidDateString = (dateString: any) => {
  if (typeof dateString !== 'string' && typeof dateString !== 'object') {
    return false;
  }

  const timestamp = Date.parse(dateString);

  return !isNaN(timestamp);
};

export const convertToStartOfUtcDate = (date: any): Date | null => {
  if (!isValidDateString(date)) {
    return null;
  }

  const stdDate = new Date(date);

  const y = stdDate.getFullYear();
  const m = stdDate.getMonth();
  const d = stdDate.getDate();

  return new Date(Date.UTC(y, m, d, 0, 0, 0));
};

export const standardDate = (date: any, isNew = false): Date | null => {
  if (!date) {
    if (isNew) {
      return createStartOfDate();
    }

    return null;
  }

  return new Date(date);
};

export const formatRelativeDate = (date: Date | string | undefined) => {
  if (!date) {
    return NotApplicable;
  }

  const standardDate = new Date(date);
  const dateUnixTime = getUnixTime(standardDate);
  const today = getUtcDate();

  const nowUnixDay = getUnixTime(today);
  const dayOfWeek = today.getDay();
  const distance = Math.floor((nowUnixDay - dateUnixTime) / (3600 * 24));

  if (distance === 0) {
    return 'Today';
  }

  if (distance === 1) {
    return 'Yesterday';
  }

  if (distance < 7) {
    let prefix = '';
    if (distance > dayOfWeek) {
      prefix = 'Last ';
    }

    return prefix + format(standardDate, 'EEEE');
  }

  return formatDistance(standardDate, today, { addSuffix: false }) + '';
};

export const createStartOfDate = (utcOffset = 0) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  const utcDate = new Date(Date.UTC(y, m, d, 0, 0, 0));

  if (!utcOffset) {
    return utcDate;
  }

  utcDate.setMinutes(-utcOffset);

  return utcDate;
};
