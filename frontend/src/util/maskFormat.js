/* eslint-disable no-plusplus */
export default function(value, mask) {
  const valueString = String(value);
  let result = '';
  for (
    let maskIndex = 0, stringIndex = 0;
    maskIndex < mask.length && stringIndex < valueString.length;
    maskIndex++
  ) {
    result +=
      mask[maskIndex] === 'X'
        ? valueString.charAt(stringIndex++)
        : mask.charAt(maskIndex);
  }
  return result;
}
