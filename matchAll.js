/**
 * @param {RegExp} regex
 * @param {string} content
 * @return {RegExpExecArray[]}
 */
module.exports = function matchAll(regex, content) {
  const match = regex.exec(content);
  if (!match) return [];

  return [match, ...matchAll(regex, content.substring(match.index + match[0].length))];
};
