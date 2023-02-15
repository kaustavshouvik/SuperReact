const getComponentName = (content) => {
  const reg = /export\s*default\s*\w*/;
  let match = content.match(reg);

  const componentName = match[0].replace(/export\s*default\s*/, '');

  return { componentName, exportIndex: match.index };
};

module.exports = getComponentName;
