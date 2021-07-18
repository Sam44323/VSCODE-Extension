const vscode = require("vscode");
const axios = require("axios");
const xmlParser = require("fast-xml-parser");

async function getBlogs() {
  const res = await axios.default.get(
    "https://blog.webdevsimplified.com/rss.xml"
  );
  const articles = xmlParser.parse(res.data).rss.channel.item;
  console.log(articles);
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
