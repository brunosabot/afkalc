import resources from "../../../../data/resources.json";

function getItem(item?: string) {
  return (
    resources.find((resource) => resource.name === item) || { name: "", image: "", cost: undefined }
  );
}

export default function useItem() {
  return { getItem };
}
