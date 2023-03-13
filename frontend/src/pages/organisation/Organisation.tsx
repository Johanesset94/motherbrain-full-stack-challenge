import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timeline } from "../../components/timeline/Timeline";
import { useFundings } from "../../hooks/useFundings";
import { useOrgs } from "../../hooks/useOrgs";

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
      {data?.[0] &&
        Object.entries(data[0])
          .filter(([key, value]) => !!value && key !== "uuid")
          .map(([key, value]) => (
            <p key={key}>
              {key.replaceAll("_", " ")}: {value}
            </p>
          ))}
      {fundings && (
        <div>
          <h2>Funding rounds</h2>
          <Timeline
            items={fundings.map((funding) => ({
              date: funding.announced_on,
              description: `Amount raised: ${funding.raised_amount_usd}$\nSeries: ${funding.investment_type}`,
            }))}
          />
        </div>
      )}
    </div>
  );
};
