export type Funding = {
  announced_on: string;
  company_name: string;
  raised_amount_usd: string | null;
  investment_type: string;
  investor_names?: string;
};

export const getFundings = ({
  limit = "10",
  offset = "0",
  ...args
}: Record<string, string>) => {
  const url = new URL("http://localhost:8080/fundings");
  Object.entries(args)
    .filter(([_, value]) => !!value)
    .forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  url.searchParams.set("offset", offset);
  url.searchParams.set("limit", limit);

  return fetch(url)
    .then((response) => response.json())
    .then(({ results: { hits, total } }) => {
      const _offset = parseInt(offset);
      const _limit = parseInt(limit);
      const _total = parseInt(total);
      let nextCursor;
      if (_offset + _limit < _total) {
        nextCursor = _offset + _limit;
      }
      return {
        data: hits as Array<Funding>,
        nextCursor,
      };
    });
};
