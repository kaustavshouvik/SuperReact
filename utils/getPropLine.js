const getPropLine = (content, componentName) => {
  let reg = new RegExp('const\\s*' + componentName + '\\s*=\\s*');
  const match = content.match(reg);

  const n = content.length;
  let brackets = 0;
  let i = match.index + match[0].length;
  while (i < n) {
    if ('{(['.includes(content[i])) brackets += 1;
    if ('})]'.includes(content[i])) brackets -= 1;

    if (brackets === 0) break;
    i++;
  }

  let propLine = content.slice(match.index + match[0].length, i + 1);

  reg = /{[\s,\S]*}/;
  propLine = propLine.match(reg);

  if (!propLine) return '';
  return propLine[0].slice(1, -1);
};

module.exports = getPropLine;
