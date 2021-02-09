import { useEffect, useRef } from "react";

export default function useMemoCompare<T>(
  next: T,
  compare: (previous: T | undefined, next: T) => boolean
) {
  const previousRef = useRef<T>();
  const previous = previousRef.current;

  const isEqual = compare(previous, next);

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  return isEqual ? previous : next;
}
