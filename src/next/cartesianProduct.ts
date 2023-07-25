export function cartesianProduct(...sets: string[][]) {
  return sets.reduce(
    (previousResult, set) => previousResult.flatMap((otherSet) => set.map((value) => [otherSet, value].flat())),
    [[]] as string[][],
  );
}
