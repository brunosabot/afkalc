import artifacts from "../../../../data/artifacts.json";

export interface Artifact {
  name: string;
  id: number;
  image: string;
}

const artifactsJson = artifacts as Artifact[];

function getArtifact(artifact?: number): Artifact {
  return artifactsJson.find((a) => a.id === artifact) || { name: "", id: 0, image: "" };
}

export default function useArtifact() {
  return { getArtifact };
}
