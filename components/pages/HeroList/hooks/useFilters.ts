import { useMemo, useReducer } from "react";

interface Action {
  type: string;
  value: string;
}

export interface State {
  name: string;
  type: string;
  class: string;
  role: string;
  faction: string;
  ascend: string;
  engrave: string;
  si: string;
  fi: string;
  directionAscend: string;
  directionSi: string;
  directionFi: string;
  directionEngrave: string;
}

const initialState = {
  name: "",
  type: "",
  class: "",
  role: "",
  faction: "",
  ascend: "",
  si: "",
  fi: "",
  engrave: "",
  directionAscend: ">=",
  directionSi: ">=",
  directionFi: ">=",
  directionEngrave: ">=",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
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
    case "engrave":
      return { ...state, engrave: action.value };
    case "direction-ascend":
      return { ...state, directionAscend: action.value };
    case "direction-si":
      return { ...state, directionSi: action.value };
    case "direction-fi":
      return { ...state, directionFi: action.value };
    case "direction-engrave":
      return { ...state, directionEngrave: action.value };
    default:
      return state;
  }
}

export default function useFilters(): [State, (action: Action) => void] {
  const [state, dispatch] = useReducer(reducer, initialState);

  return useMemo(() => [state, dispatch], [state]);
}
