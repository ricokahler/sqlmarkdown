const matchAll = require('./matchAll');
const flatten = require('lodash/flatten');
const showdown = require('showdown');

const converter = new showdown.Converter();
const makeHtml = converter.makeHtml.bind(converter);

module.exports = function parseMarkdown(content) {
  const matches = matchAll(/```sql\n((?:.(?!(```)))*)\n```/is, content);

  const indexes = [
    ...matches
      .map(match => [match.index, match.index + match[0].length])
      .reduce((indexes, [start, end]) => {
        const endOffset = indexes[indexes.length - 1] || 0;
        return [...indexes, start + endOffset, end + endOffset];
      }, []),
    content.length,
  ];

  const splitIndexes = indexes.map((index, i) => [indexes[i - 1] || 0, index]);
  const splits = splitIndexes.map(([begin, end]) => content.substring(begin, end));

  const pairs = flatten(
    splits
      .reduce((tuples, next, index) => {
        const tuple = tuples[Math.floor(index / 2)] || [];
        tuple[index % 2] = next;
        tuples[Math.floor(index / 2)] = tuple;
        return tuples;
      }, [])
      .map(([text, code]) => {
        const match = /```sql\n((?:.(?!(```)))*)\n```/is.exec(code);
        if (!match) return [text];

        return [text, match[1]];
      })
      .map(([text, code]) => {
        if (!code) return [{ markdown: text }];
        return [{ markdown: text }, { query: code }];
      }),
  ).map(node => (node.markdown ? { markdown: makeHtml(node.markdown) } : node));

  return pairs;
};
