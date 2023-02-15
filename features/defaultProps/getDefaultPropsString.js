const getDefaultPropsString = (propEntries, componentName) => {
  var entries = Object.entries(propEntries);
  if (entries.length === 0) return '';

  let res = `\n${componentName}.defaultProps = {\n`;
  for (var [key, val] of entries) {
    res += `\t${key}: ${val},\n`;
  }
  res += '};\n';

  return res;
};

module.exports = getDefaultPropsString;
