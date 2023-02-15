const getDataType = (valString = '') => {
  const val = Function('return ' + valString)();
  const valType = Object.prototype.toString.call(val);

  return valType.slice(8, -1);
};

module.exports = getDataType;
