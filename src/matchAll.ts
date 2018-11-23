/**
 * @param {RegExp} regex
 * @param {string} content
 * @return {RegExpExecArray[]}
 */
export default function matchAll(regex: RegExp, content: string): Array<RegExpExecArray> {
  const match = regex.exec(content);
  if (!match) return [];

  return [match, ...matchAll(regex, content.substring(match.index + match[0].length))];
}
