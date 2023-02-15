const vscode = require('vscode');

const getComponentName = require('../../utils/getComponentName');
const getPropLine = require('../../utils/getPropLine');
const getPropEntries = require('../../utils/getPropEntries');
const getDefaultPropsString = require('./getDefaultPropsString');
const getOldDefPropPos = require('../../utils/getOldDefPropPos');

const addDefaultProps = async (filepath) => {
  const uri = vscode.Uri.file(filepath);
  let buf = await vscode.workspace.fs.readFile(uri);
  let content = buf.toString('utf8');

  const { componentName, exportIndex } = getComponentName(content);

  const propLine = getPropLine(content, componentName);
  const propEntries = getPropEntries(propLine);

  const defaultProps = getDefaultPropsString(propEntries, componentName);

  const oldPos = getOldDefPropPos(content, componentName);

  let i = oldPos.position;
  if (i === -1) i = exportIndex;

  let begin = content.slice(0, i).trim().split('\n');
  let end = content
    .slice(i + oldPos.length)
    .trim()
    .split('\n');

  const middle = defaultProps.split('\n');

  const finalContent = [...begin, ...middle, ...end].join('\n');

  buf = Buffer.from(finalContent, 'utf8');
  await vscode.workspace.fs.writeFile(uri, buf);
};

module.exports = addDefaultProps;
