import { useInfiniteQuery } from "@tanstack/react-query";
import { getFundings } from "../queries/fundings";

interface Args {
  company_name?: string;
  company_name_exact?: string;
  sort?: string;
}

export const useFundings = (args: Args) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["getFundings", args.company_name, args.sort],
    queryFn: ({ pageParam = 0 }) => getFundings({ ...args, offset: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    keepPreviousData: true,
  });
  return queryResult;
};
