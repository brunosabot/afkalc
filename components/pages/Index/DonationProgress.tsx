import { useTranslation } from "next-i18next";
import React from "react";
import CardHelp from "../../ui/card/CardHelp";
import classes from "./DonationProgress.module.css";

interface IProps {
  earnings: number;
  spendings: number;
  donations: string[];
}

const DonationProgress: React.FC<IProps> = function DonationProgress({
  donations,
  earnings,
  spendings,
}) {
  const { t } = useTranslation("common");

  const earningsFormatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
  }).format(earnings);

  const spendingsFormatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
  }).format(spendings);

  const donatorsFormatted = new Intl.ListFormat(undefined, {
    style: "long",
    type: "conjunction",
  }).format(donations);

  return (
    <CardHelp>
      <div className={classes.Info}>
        <span>
          {t("common:earnings")} {earningsFormatted}
        </span>
        <span>
          {t("common:spendings")} {spendingsFormatted}
        </span>
      </div>
      <progress max={spendings} value={earnings} className={classes.Bar} />
      {t("common:sponsors")} {donatorsFormatted}
    </CardHelp>
  );
};

export default DonationProgress;
