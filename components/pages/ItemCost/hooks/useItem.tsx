import resources from "../../../../data/resources.json";

function getItem(item?: number) {
  return resources.find((resource) => resource.id === item);
}

export default function useItem() {
  return { getItem };
}
