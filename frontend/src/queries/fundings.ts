export type Funding = {
  announced_on: string;
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
    .then(({ results: { hits } }) => {
      return hits as Array<Funding>;
    });
};
