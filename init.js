const chalk = require("chalk");
const ora  = require("ora");
const fs = require("fs-extra");
const shelljs = require("shelljs");
const symbols = require('log-symbols');
const git = require('isomorphic-git');
const config = require("./config");


git.plugins.set("fs", fs);

let init = (branch, name) => {
  const spinner = ora('正在初始化项目...');
  const { gitUrl } = config;
  if(!fs.existsSync(name)) {
    console.log(branch, 88);
    console.log(`${chalk.red("Init project in:  ")}${chalk.green(name)}`);
    spinner.start();
    git.clone({
      url: gitUrl,
      singleBranch: true,
      ref: branch,
      depth: 1,
      dir: name,
      noTags: true
    }).then(() => {
      shelljs.rm("-rf", `${name}/.git`);
      spinner.succeed();
      console.log(symbols.success, chalk.green('Project initialized successfully'));
      showExtra();
    }).catch((e) => {
      spinner.fail();
      console.log(symbols.error, chalk.red(e));
    })
  } else {
    console.log(symbols.error, chalk.red("该目录下已存在同名文件夹!"));
  }
}

let showInfo = () => {
  console.log("");
  console.log("create app with react hooks");
  console.log("");
  console.log("Example:");
  console.log("");
  console.log(` ${chalk.bgBlue(" Basic: ")}`);
  console.log(`     create-react-ling ${chalk.green("<your_project_name_here>")}`);
  console.log("");
}

let showExtra = () => {
  console.log("");
  console.log(`${chalk.cyan("npm run dev")}`);
  console.log("   start the development server");
  console.log("");
  console.log(`${chalk.cyan("npm run build")}`);
  console.log("   bundle your app for production");
  console.log("");
};

module.exports = {
  init,
  showInfo
};
