import React from "react";

interface IProps {
  [key: string]: never;
}

const InSeason: React.FC<IProps> = function InSeason() {
  return (
    <a target="_blank" rel="noreferrer" href="https://www.reddit.com/user/inSeason/">
      u/inSeason
    </a>
  );
};

export default InSeason;
