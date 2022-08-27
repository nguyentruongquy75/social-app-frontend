import moment from 'moment';
import { TIME } from '../constants';

export function handleTimeString(time: string) {
  const date = moment(time);
  const now = moment(new Date());

  const duration = moment.duration(now.diff(date));

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (years) return `${years} ${TIME.YEAR}`;
  if (months) return `${months} ${TIME.MONTH}`;
  if (days) return `${days} ${TIME.DAY}`;
  if (hours) return `${hours} ${TIME.HOUR}`;
  if (minutes) return `${minutes} ${TIME.MINUTE}`;
  return `${seconds} ${TIME.SECOND}`;
}
