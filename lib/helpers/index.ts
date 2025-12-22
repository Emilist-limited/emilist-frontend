export function numberWithCommas(x: number | string) {
  const num = parseFloat(x.toString());
  return Number.isInteger(num)
    ? num.toLocaleString()
    : num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}

export const Capitalize = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const hasLetter = (str: string) => {
  if (typeof str !== "string") return false;
  return str.trim().length > 0;
};

export const convertDateFormat = (oldDate: Date | string): string => {
  let date = new Date(oldDate).toString().split(" ");
  let newFormat = ` ${date[2]}  ${date[1]}, ${date[3]}`;
  return newFormat;
};
