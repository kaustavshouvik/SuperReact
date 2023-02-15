// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const addPropTypes = require('./features/propTypes');
const addDefaultProps = require('./features/defaultProps');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand('SuperReact.defAndTypes', async function () {
    try {
      const { fileName } = vscode.window.activeTextEditor.document;
      await addPropTypes(fileName);
      await addDefaultProps(fileName);
    } catch (error) {
      vscode.window.showErrorMessage(
        'Error occurred while generating prop types and default props.',
      );
    }
  });

  let propTypes = vscode.commands.registerCommand('SuperReact.addPropTypes', async function () {
    try {
      const { fileName } = vscode.window.activeTextEditor.document;
      await addPropTypes(fileName);
    } catch (error) {
      vscode.window.showErrorMessage('Error occurred while generating prop types.');
    }
  });

  let defProps = vscode.commands.registerCommand('SuperReact.addDefProps', async function () {
    try {
      const { fileName } = vscode.window.activeTextEditor.document;
      await addDefaultProps(fileName);
    } catch (error) {
      vscode.window.showErrorMessage('Error occurred while generating default props.');
    }
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(propTypes);
  context.subscriptions.push(defProps);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
