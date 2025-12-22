export const checkAllFieldsFilled = <T extends Record<string, any>>(
  fields: T
): boolean => {
  return Object.values(fields).every(
    (value) => value !== "" && value !== null && value !== undefined
  );
};
