import { useMemo, useReducer } from "react";

interface Action {
  type: string;
  value: string;
}

export interface State {
  name: string;
  type: string[];
  class: string[];
  role: string[];
  faction: string[];
  ascend: string;
  engrave: string;
  si: string;
  fi: string;
  equip: string;
  directionAscend: string;
  directionSi: string;
  directionFi: string;
  directionEngrave: string;
  directionEquip: string;
}

const initialState = {
  name: "",
  type: [],
  class: [],
  role: [],
  faction: [],
  ascend: "",
  si: "",
  fi: "",
  engrave: "",
  equip: "",
  directionAscend: ">=",
  directionSi: ">=",
  directionFi: ">=",
  directionEngrave: ">=",
  directionEquip: ">=",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "type":
      if (state.type.includes(action.value)) {
        return { ...state, type: state.type.filter((t) => t !== action.value) };
      }
      return { ...state, type: [...state.type, action.value] };
    case "class":
      if (state.class.includes(action.value)) {
        return { ...state, class: state.class.filter((c) => c !== action.value) };
      }
      return { ...state, class: [...state.class, action.value] };
    case "role":
      if (state.role.includes(action.value)) {
        return { ...state, role: state.role.filter((r) => r !== action.value) };
      }
      return { ...state, role: [...state.role, action.value] };
    case "faction":
      if (state.faction.includes(action.value)) {
        return { ...state, faction: state.faction.filter((f) => f !== action.value) };
      }
      return { ...state, faction: [...state.faction, action.value] };
    case "ascend":
      return { ...state, ascend: action.value };
    case "si":
      return { ...state, si: action.value };
    case "fi":
      return { ...state, fi: action.value };
    case "engrave":
      return { ...state, engrave: action.value };
    case "equip":
      return { ...state, equip: action.value };
    case "direction-ascend":
      return { ...state, directionAscend: action.value };
    case "direction-si":
      return { ...state, directionSi: action.value };
    case "direction-fi":
      return { ...state, directionFi: action.value };
    case "direction-engrave":
      return { ...state, directionEngrave: action.value };
    case "direction-equip":
      return { ...state, directionEquip: action.value };
    default:
      return state;
  }
}

export default function useFilters(): [State, (action: Action) => void] {
  const [state, dispatch] = useReducer(reducer, initialState);

  return useMemo(() => [state, dispatch], [state]);
}
