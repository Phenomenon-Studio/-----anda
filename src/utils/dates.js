import * as dayjs from 'dayjs';

export const expirationDateInHours = hours => new Date(new Date().getTime() + hours * 60 * 60 * 1000);

export const getDateFromUnix = time => dayjs.unix(time).format('MMM DD, YYYY, hh:mm A');
