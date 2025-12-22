export const createSearchHandler = (router: any) => {
  return (path: string, queryParams: Record<string, string | undefined>) => {
    const query = new URLSearchParams(
      Object.entries(queryParams).reduce((acc: any, [key, value]) => {
        if (value?.trim()) acc[key] = value.trim();
        return acc;
      }, {})
    ).toString();
    router.push(`${path}${query ? `?${query}` : ""}`);
  };
};
