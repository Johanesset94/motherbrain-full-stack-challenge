import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFundings } from "../../hooks/useFundings";
import { useOrgs } from "../../hooks/useOrgs";
import { Fundings } from "./components/Fundings";

export const Organisation = () => {
  const { company_name } = useParams();
  const navigate = useNavigate();
  const { data } = useOrgs({ company_name_exact: company_name, limit: 1 });
  const { data: fundings } = useFundings({
    company_name_exact: company_name,
    sort: "announced_on:asc",
  });
  console.log(data);
  console.log(fundings);
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <h1>{company_name}</h1>

      {data?.[0] && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}>
          {Object.entries(data[0])
            .filter(([key, value]) => !!value && key !== "uuid")
            .map(([key, value]) => (
              <React.Fragment key={key}>
                <div style={{ textTransform: "capitalize", fontWeight: 700 }}>
                  {key.replaceAll("_", " ")}
                </div>
                <div>{value}</div>
              </React.Fragment>
            ))}
        </div>
      )}
      {fundings && fundings.length > 0 && <Fundings fundings={fundings} />}
    </div>
  );
};
