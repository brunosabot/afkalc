import React from "react";

interface IProps {
  [key: string]: never;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/tiers-list",
      permanent: true,
    },
  };
}

const PriorityList: React.FC<IProps> = function PriorityList() {
  return null;
};

export default PriorityList;
