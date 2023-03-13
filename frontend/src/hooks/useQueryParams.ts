import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

export const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = queryString.parse(location.search);

  const setQueryParams = (newParams: Record<string, any>) =>
    navigate(
      `?${queryString.stringify(
        { ...queryParams, ...newParams },
        { skipNull: true, skipEmptyString: true }
      )}`,
      { replace: true }
    );

  return { queryParams, setQueryParams };
};
