import React from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { useOrgs } from "../../hooks/useOrgs";
import { useQueryParams } from "../../hooks/useQueryParams";
import styles from "./Search.module.css";

type QueryParams = {
  limit?: string;
  offset?: string;
  query?: string;
};

export const Search = () => {
  const navigate = useNavigate();
  const { queryParams, setQueryParams } = useQueryParams();
  const { query = "", limit, offset } = queryParams as QueryParams;

  const debouncedSearchQuery = useDebounce(query, 300);

  const { data, isLoading } = useOrgs({
    company_name: debouncedSearchQuery || "",
  });

  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      <h1>Search organizations</h1>
      <input
        placeholder="Start type to search..."
        value={query}
        onChange={({ target: { value } }) => setQueryParams({ query: value })}
      />
      {isLoading && <div>Loading...</div>}
      {data?.map((org) => (
        <div
          className={styles["search-result"]}
          key={org.uuid}
          onClick={() => {
            navigate(`/organisation/${org.company_name}`);
          }}
        >
          {org.company_name}
        </div>
      ))}
    </div>
  );
};
