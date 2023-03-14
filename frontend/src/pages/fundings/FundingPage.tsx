import React from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { Timeline } from "../../components/timeline/Timeline";
import { useFundings } from "../../hooks/useFundings";
import { useIntersectionScroll } from "../../hooks/useIntersectionScroll";
import { useQueryParams } from "../../hooks/useQueryParams";
import { getFundingTimelineItems } from "../../util/funding-util";
import styles from "./Fundings.module.css";

type QueryParams = {
  limit?: string;
  offset?: string;
  company_name?: string;
  sort?: "asc" | "desc";
};

export const FundingPage = () => {
  const navigate = useNavigate();
  const { queryParams, setQueryParams } = useQueryParams();
  const { company_name = "", sort } = queryParams as QueryParams;

  const debouncedSearchQuery = useDebounce(company_name, 300);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFundings({
      company_name: debouncedSearchQuery || "",
      sort: `announced_on:${sort || "desc"}`,
    });
  const fundings = data?.pages?.flatMap((page) => page.data);

  const lastItemRef = useIntersectionScroll(
    !!hasNextPage,
    !!hasNextPage && !isFetchingNextPage,
    fetchNextPage,
    fundings || []
  );

  return (
    <div className={styles.grid}>
      <div className={styles.col}>
        <button onClick={() => navigate("/")}>Home</button>
        <h1>Search fundings</h1>
        <label>Search company</label>
        <input
          placeholder="Filter on company name"
          value={company_name}
          onChange={({ target: { value } }) =>
            setQueryParams({ company_name: value })
          }
        />
        <button
          onClick={() => {
            setQueryParams({ sort: sort === "asc" ? "desc" : "asc" });
          }}
        >
          Sort {sort === "asc" ? "descending" : "ascending"}
        </button>
      </div>
      {isLoading && <div>Loading...</div>}
      {fundings && (
        <Timeline
          items={getFundingTimelineItems(fundings, true)}
          lastItemRef={lastItemRef}
        />
      )}
    </div>
  );
};
