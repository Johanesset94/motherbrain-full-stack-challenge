import React from "react";
import { Pie } from "react-chartjs-2";
import { Timeline } from "../../../components/timeline/Timeline";

import { Funding } from "../../../queries/fundings";
import { MpyaColors } from "../../../util/colors";
import styles from "./Fundings.module.css";

export interface FundingsProps {
  fundings: Funding[];
}

const getInvestorString = (investors: string) =>
  investors.replace(/[^a-zA-Z0-9\-, ]*/g, "").replace(",", ", ");

export const Fundings: React.FC<FundingsProps> = ({ fundings }) => {
  return (
    <div>
      <h2>Funding rounds</h2>
      <div className={styles.grid}>
        <Timeline
          items={fundings.map((funding) => ({
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
          }))}
        />
        <div>
          <Pie
            options={{ responsive: true, resizeDelay: 100 }}
            redraw
            data={{
              labels: fundings
                .filter(({ raised_amount_usd }) => raised_amount_usd !== null)
                .map(
                  (funding) =>
                    `${funding.announced_on}: ${funding.investment_type}`
                ),
              datasets: [
                {
                  data: fundings
                    .filter(
                      ({ raised_amount_usd }) => raised_amount_usd !== null
                    )
                    .map((funding) => funding.raised_amount_usd),
                  backgroundColor: MpyaColors,
                  borderWidth: 0,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};
