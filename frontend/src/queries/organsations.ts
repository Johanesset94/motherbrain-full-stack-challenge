type org = {
  uuid: string;
  company_name: string;
  city?: string;
  country_code?: string;
  description?: string;
  employee_count: string;
  funding_rounds: string;
  funding_total_usd: string;
  homepage_url: string;
  short_description: string;
};

export const getOrgs = ({
  limit = "10",
  offset = "0",
  ...args
}: Record<string, string>) => {
  const url = new URL("http://localhost:8080/orgs");
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
      return hits as Array<org>;
    });
};
