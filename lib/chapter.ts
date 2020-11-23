export function compareChapter(chapterA: string, chapterB: string) {
  if (chapterB === undefined) return 1;
  if (chapterA === undefined) return -1;

  const splittedChapterA = chapterA.split("-").map((e) => parseInt(e, 10));
  const splittedChapterB = chapterB.split("-").map((e) => parseInt(e, 10));

  if (splittedChapterA[0] < splittedChapterB[0]) {
    return -1;
  }
  if (splittedChapterA[0] > splittedChapterB[0]) {
    return 1;
  }
  if (splittedChapterA[1] < splittedChapterB[1]) {
    return -1;
  }
  if (splittedChapterA[1] > splittedChapterB[1]) {
    return 1;
  }
  return 0;
}

export default compareChapter;
