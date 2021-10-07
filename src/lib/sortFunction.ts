function sortfunction(a, b) {
  return parseFloat(b.percentCases) - parseFloat(a.percentCases);
}

export const sortAnNumberArray = (array: number[]) => array.sort(sortfunction);
