import { useQuery } from "@tanstack/react-query";
import { getOrgs } from "../queries/organsation-queries";

export const useOrgs = (args = {}) => {
  const queryResult = useQuery({
    queryKey: [
      "getOrgs",
      Object.entries(args).map(([key, value]) => `${key}:${value}`),
    ],
    queryFn: () => getOrgs(args),
    keepPreviousData: true,
  });

  return queryResult;
};
