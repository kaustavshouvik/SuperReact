const getPropEntries = (propLine) => {
  const pairs = [];

  let keyVal = '';
  let brackets = 0;
  for (const c of propLine) {
    if (c === ',') {
      if (brackets === 0) {
        pairs.push(keyVal);
        keyVal = '';
        continue;
      }
    }

    if ('{[') brackets += 1;
    if ('}]') brackets -= 1;

    keyVal += c;
  }

  if (keyVal.trim()) {
    pairs.push(keyVal);
  }

  const entries = {};

  for (let keyVal of pairs) {
    const i = keyVal.indexOf('=');
    if (i !== -1) {
      const key = keyVal.slice(0, i);
      const val = keyVal.slice(i + 1);

      entries[key.trim()] = val.trim();
    }
  }

  return entries;
};

module.exports = getPropEntries;
