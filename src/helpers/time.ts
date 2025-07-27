const getUTC7Time = (date: Date): string => {
  const formatted = date.toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatted.split(', ');
  const datePart = parts[0];
  const timePart = parts[1];

  const [month, day, year] = datePart.split('/');

  return `${day}/${month}/${year} ${timePart}`;
};

const calculateDuration = (start: Date, end: Date): string | null => {
  if (start > end) {
    return 'Invalid date range';
  }

  if (start === null || end === null) return null;

  const duration = end.getTime() - start.getTime();
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} day ${hours} hour ${minutes} minute ${seconds} second`;
  }

  if (hours > 0) {
    return `${hours} hour ${minutes} minute ${seconds} second`;
  }

  if (minutes > 0) {
    return `${minutes} minute ${seconds} second`;
  }

  return `${seconds} second`;
};

export { calculateDuration, getUTC7Time };
