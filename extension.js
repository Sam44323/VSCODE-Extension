const vscode = require("vscode");
const axios = require("axios");
const xmlParser = require("fast-xml-parser");

async function getBlogs() {
  const res = await axios.default.get(
    "https://blog.webdevsimplified.com/rss.xml"
  );

  return res;
}

async function activate(context) {
  const result = await getBlogs();
  const articles = xmlParser
    .parse(result.data)
    .rss.channel.item.map((article) => ({
      label: article.title,
      detail: article.description,
      link: article.link,
    }));

  let disposable = vscode.commands.registerCommand(
    "some-demo-extension.getBlogs",
    async function () {
      const article = await vscode.window.showQuickPick(articles, {
        matchOnDetail: true,
      }); // showing the articles in the quick pick and storing the clicked one in article
      if (!article) {
        return;
      }
      // @ts-ignore
      vscode.env.openExternal(article.link); //for opening an external link
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
