export const generateYears = (
  fromYear: number
): { value: string; label: string }[] => {
  const currentYear = new Date().getFullYear();
  const startYear = fromYear;
  const years: { value: string; label: string }[] = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push({ value: year.toString(), label: year.toString() });
  }

  return years;
};
