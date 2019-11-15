#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const pkg = require("../package");
const config = require("../config");
const { init, showInfo } = require("../init");

commander
    .version(pkg.version)
    .option("<name>")
    .option("");

commander.on("--help", showInfo);

commander.parse(process.argv);

console.log(`TYPE: ${chalk.bgBlue("React base")}`);
init(config.branch.default, commander.args[0]);
