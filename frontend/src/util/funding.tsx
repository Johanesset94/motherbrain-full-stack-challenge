import { Funding } from "../queries/fundings";

export const getInvestorString = (investors: string) =>
  investors.replace(/[^a-zA-Z0-9\-, ]*/g, "").replace(",", ", ");

export const getFundingTimelineItems = (
  fundings: Funding[],
  includeCompany?: boolean
) =>
  fundings.map((funding) => ({
    date: funding.announced_on,
    description: `USD raised: ${
      funding.raised_amount_usd
        ? parseInt(funding.raised_amount_usd).toLocaleString()
        : "unknown"
    }\nSeries: ${funding.investment_type}${
      funding.investor_names &&
      getInvestorString(funding.investor_names) &&
      `\nInvestors: ${getInvestorString(funding.investor_names)}`
    }`,
    cta: includeCompany && funding.company_name,
  }));
