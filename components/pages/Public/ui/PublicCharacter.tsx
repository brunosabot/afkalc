import React from "react";
import { withTooltip } from "../../../functionnal/withTooltip";
import Character, { ICharacterProps } from "../../../ui/afk/Character";

interface IProps extends ICharacterProps {
  // Used by the tooltip
  // eslint-disable-next-line react/no-unused-prop-types
  label: any;
}

const PublicCharacter: React.FC<IProps> = function PublicCharacter({ label, ...props }) {
  return <Character {...props} />;
};

export default React.memo(withTooltip(PublicCharacter));
