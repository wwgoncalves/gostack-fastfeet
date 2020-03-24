/* eslint-disable no-plusplus */
export default function(mask, number) {
  const s = `${number}`;
  let r = '';
  for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
    r += mask[im] === 'X' ? s.charAt(is++) : mask.charAt(im);
  }
  return r;
}
