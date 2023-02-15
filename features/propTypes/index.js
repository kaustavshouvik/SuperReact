const vscode = require('vscode');

const getComponentName = require('../../utils/getComponentName');
const getPropLine = require('../../utils/getPropLine');
const getPropEntries = require('../../utils/getPropEntries');
const getPropTypesString = require('./getPropTypesString');
const getOldDefPropPos = require('../../utils/getOldDefPropPos');
const getOldPropTypesPos = require('./getOldPropTypesPos');

const addPropTypes = async (filepath) => {
  const uri = vscode.Uri.file(filepath);
  let buf = await vscode.workspace.fs.readFile(uri);
  let content = buf.toString('utf8');

  const { componentName, exportIndex } = getComponentName(content);
  const oldDefPropsPos = getOldDefPropPos(content, componentName);

  const propLine = getPropLine(content, componentName);
  const propEntries = getPropEntries(propLine);
  const propTypes = getPropTypesString(propEntries, componentName);

  const oldPos = getOldPropTypesPos(content, componentName);

  let i = oldPos.position;
  if (i === -1) i = oldDefPropsPos.position;
  if (i === -1) i = exportIndex;

  const begin = content.slice(0, i).trim().split('\n');
  const end = content
    .slice(i + oldPos.length)
    .trim()
    .split('\n');

  const middle = propTypes.split('\n');

  const finalContent = [...begin, ...middle, ...end].join('\n');

  buf = Buffer.from(finalContent, 'utf8');
  await vscode.workspace.fs.writeFile(uri, buf);
};

module.exports = addPropTypes;
