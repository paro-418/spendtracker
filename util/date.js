export function getFormattedDate(date) {
  // if (date.toString() === 'Invalid Date') return 'Invalid Date';
  // console.log(date);
  return date.toISOString().slice(0, 10);
}

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
