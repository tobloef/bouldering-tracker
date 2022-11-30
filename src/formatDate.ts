function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dayStr = day.toString().padStart(2, '0');
  const monthStr = month.toString().padStart(2, '0');
  const yearStr = year.toString();

  return `${yearStr}-${monthStr}-${dayStr}`;
}

export default formatDate;
