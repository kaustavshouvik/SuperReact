const getOldDefPropPos = (content, componentName) => {
  const reg = new RegExp(`${componentName}` + '\\s*.\\s*defaultProps\\s*=\\s*{[\\s,\\S]*\\};*');

  const match = content.match(reg);
  if (!match) return { position: -1, length: 0 };

  return { position: match.index, length: match[0].length };
};

module.exports = getOldDefPropPos;
