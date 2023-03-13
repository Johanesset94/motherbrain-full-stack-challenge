import { useOrgs } from "../hooks/useOrgs";

export const OrgTable = () => {
  const { data: orgs, isLoading } = useOrgs();

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (!orgs) {
    return <div>Error</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>

      <tbody>
        {orgs.map((org) => (
          <tr key={org.uuid}>
            <td>{org.company_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
