export const mapExpertLevel = (expertLevel: any): number | null => {
  const expertLevelMap: any = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
  };

  return expertLevel ? expertLevelMap[expertLevel] || null : null;
};
