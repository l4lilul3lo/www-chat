var longestCommonPrefix = function (strs) {
  if (strs.length === 1) {
    return strs[0];
  }

  let prefix = strs[0];
  let windowEnd = prefix.length;

  for (let i = 1; i < strs.length; i++) {
    if (windowEnd <= 0) {
      return "";
    }
    while (strs[i].substring(0, windowEnd) !== prefix) {
      windowEnd--;
      prefix = prefix.substring(0, windowEnd);
    }
  }
  return prefix;
};
