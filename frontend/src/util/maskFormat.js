/* eslint-disable no-plusplus */
export default function(value, mask) {
  const maskSeparators = mask.replace('X', '').split('');
  const separatorsRegExp = new RegExp(`[\\${maskSeparators.join('\\')}]`, 'g');
  const valueString = String(value).replace(separatorsRegExp, '');
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
