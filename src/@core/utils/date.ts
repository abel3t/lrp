import { format, formatDistance, getUnixTime } from 'date-fns';

import { NotApplicable } from '../contanst';

export const getUtcDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return new Date(Date.UTC(year, month, day, 0, 0, 0));
};

export const standardDate = (date: any): Date => {
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
