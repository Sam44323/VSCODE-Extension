const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(
    'Congratulations, your extension "some-demo-extension" is now active!'
  );
  let disposable = vscode.commands.registerCommand(
    "some-demo-extension.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from Demo-Extension!");
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
