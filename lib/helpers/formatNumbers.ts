export const formatInputTextNumber = (value: string) => {
  // Remove all non-numeric characters
  return value.replace(/\D/g, "");
};
