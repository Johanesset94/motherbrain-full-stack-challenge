import React from "react";
import { Pie } from "react-chartjs-2";
import { Timeline } from "../../../components/timeline/Timeline";

import { Funding } from "../../../queries/funding-queries";
import { MpyaColors } from "../../../util/color-util";
import { getFundingTimelineItems } from "../../../util/funding-util";
import styles from "./OrganisationFundings.module.css";

interface FundingsProps {
  fundings: Funding[];
}

export const OrganisationFundings: React.FC<FundingsProps> = ({ fundings }) => (
  <div>
    <h2>Funding rounds</h2>
    <div className={styles.grid}>
      <Timeline items={getFundingTimelineItems(fundings)} />
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
                  .filter(({ raised_amount_usd }) => raised_amount_usd !== null)
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
