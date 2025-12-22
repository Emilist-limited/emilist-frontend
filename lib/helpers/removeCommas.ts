export const removeCommas = (value: string | number): string => {
  if (value === null || value === undefined) return "";

  const stringValue = String(value);
  return stringValue.includes(",")
    ? stringValue.replace(/,/g, "")
    : stringValue;
};
