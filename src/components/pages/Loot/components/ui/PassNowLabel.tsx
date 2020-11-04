import React from "react";

interface IProps {
  setPass: (value: string) => void;
}

const PassNowLabel: React.FC<IProps> = ({ setPass }) => {
  return (
    <span>
      Stage start date
      <button
        type="button"
        onClick={() => setPass(new Date().toLocaleString("en-US"))}
        className="input-field__label-link"
      >
        Set now
      </button>
    </span>
  );
};

export default PassNowLabel;
