import React from "react";
import { withTooltip } from "../../../functionnal/withTooltip";
import Character, { ICharacterProps } from "../../../ui/afk/Character";

interface IProps extends ICharacterProps {
  // Used by the tooltip
  // eslint-disable-next-line react/no-unused-prop-types
  label: any;
}

const HeroLine: React.FC<IProps> = function HeroLine(props) {
  return <Character {...props} />;
};

export default withTooltip(HeroLine);
