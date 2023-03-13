import { useQuery } from "@tanstack/react-query";
import { getFundings } from "../queries/fundings";

export const useFundings = (args = {}) => {
  const queryResult = useQuery({
    queryKey: [
      "getFundings",
      Object.entries(args).map(([key, value]) => `${key}:${value}`),
    ],
    queryFn: () => getFundings(args),
    keepPreviousData: true,
  });
  return queryResult;
};
