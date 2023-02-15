const getDataType = require('./getDataType');

const getPropTypesString = (entries, componentName) => {
  if (Object.entries(entries).length === 0) return '';

  const valMap = {
    Number: 'number',
    String: 'string',
    Object: 'object',
    Function: 'func',
    Boolean: 'bool',
  };

  let res = `\n${componentName}.propTypes = {\n`;

  Object.entries(entries).forEach(([key, val]) => {
    const valType = getDataType(val);
    if (valType in valMap) {
      res += `\t${key}: PropTypes.${valMap[valType]},\n`;
    }
  });

  res += '};\n';

  return res;
};

module.exports = getPropTypesString;
