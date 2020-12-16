import React from "react";
import { useTranslation } from "../../../../i18n";
import CardShare from "../../../ui/card/CardShare";

interface ITeam {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
}

interface ISi {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
}

interface IInn {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
}

interface IArtifact {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
}

interface IProps {
  team: ITeam;
  si: ISi;
  inn: IInn;
  artifact: IArtifact;
}

const ShareBanner: React.FC<IProps> = ({ team = {}, si={}, inn={}, artifact={} }) => {
  const { t } = useTranslation("top-team");

  const t1 = String.fromCharCode((team[1] || 0) + 48);
  const t2 = String.fromCharCode((team[2] || 0) + 48);
  const t3 = String.fromCharCode((team[3] || 0) + 48);
  const t4 = String.fromCharCode((team[4] || 0) + 48);
  const t5 = String.fromCharCode((team[5] || 0) + 48);
  const t6 = String.fromCharCode((team[6] || 0) + 48);
  const tCode = encodeURIComponent(`${t1}${t2}${t3}${t4}${t5}${t6}`);
  const s1 = String.fromCharCode((si[1] || 0) + 48);
  const s2 = String.fromCharCode((si[2] || 0) + 48);
  const s3 = String.fromCharCode((si[3] || 0) + 48);
  const s4 = String.fromCharCode((si[4] || 0) + 48);
  const s5 = String.fromCharCode((si[5] || 0) + 48);
  const sCode = encodeURIComponent(`${s1}${s2}${s3}${s4}${s5}`);
  const i1 = String.fromCharCode((inn[1] || 0) + 48);
  const i2 = String.fromCharCode((inn[2] || 0) + 48);
  const i3 = String.fromCharCode((inn[3] || 0) + 48);
  const i4 = String.fromCharCode((inn[4] || 0) + 48);
  const i5 = String.fromCharCode((inn[5] || 0) + 48);
  const iCode = encodeURIComponent(`${i1}${i2}${i3}${i4}${i5}`);
  const a1 = String.fromCharCode((artifact[1] || 0) + 48);
  const a2 = String.fromCharCode((artifact[2] || 0) + 48);
  const a3 = String.fromCharCode((artifact[3] || 0) + 48);
  const a4 = String.fromCharCode((artifact[4] || 0) + 48);
  const a5 = String.fromCharCode((artifact[5] || 0) + 48);
  const aCode = encodeURIComponent(`${a1}${a2}${a3}${a4}${a5}`);


  const value = `https://afkalc.com/top-team/${tCode}-${sCode}-${iCode}-${aCode}`;

  return <CardShare label={t("label-share")}>{value}</CardShare>;
};

export default ShareBanner;
