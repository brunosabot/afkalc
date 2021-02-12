import { useMemo, useReducer } from "react";

interface Action {
  type: string;
  value: string;
}

export interface State {
  type: string;
  class: string;
  role: string;
  faction: string;
  ascend: string;
  si: string;
  fi: string;
  directionAscend: string;
  directionSi: string;
  directionFi: string;
}

const initialState = {
  type: "",
  class: "",
  role: "",
  faction: "",
  ascend: "",
  si: "",
  fi: "",
  directionAscend: ">=",
  directionSi: ">=",
  directionFi: ">=",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "type":
      return { ...state, type: action.value };
    case "class":
      return { ...state, class: action.value };
    case "role":
      return { ...state, role: action.value };
    case "faction":
      return { ...state, faction: action.value };
    case "ascend":
      return { ...state, ascend: action.value };
    case "si":
      return { ...state, si: action.value };
    case "fi":
      return { ...state, fi: action.value };
    case "direction-ascend":
      return { ...state, directionAscend: action.value };
    case "direction-si":
      return { ...state, directionSi: action.value };
    case "direction-fi":
      return { ...state, directionFi: action.value };
    default:
      return state;
  }
}

export default function useFilters(): [State, (action: Action) => void] {
  const [state, dispatch] = useReducer(reducer, initialState);

  return useMemo(() => [state, dispatch], [state]);
}
