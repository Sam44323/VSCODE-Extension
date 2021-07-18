const vscode = require("vscode");
const axios = require("axios");

async function getBlogs() {
  const res = await axios.default.get(
    "https://blog.webdevsimplified.com/rss.xml"
  );
  console.log(res.data);
}

async function activate(context) {
  const blogs = await getBlogs();

  let disposable = vscode.commands.registerCommand(
    "some-demo-extension.getBlogs",
    function () {
      vscode.window.showInformationMessage("Fetching the blogs!");
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
