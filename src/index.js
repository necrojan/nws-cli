#! /usr/bin/env node
const program = require("commander");
const { latestNews } = require("./commands/commands");

program
  .version("0.1.0")
  .description("Command line app to check news around the world.");

program
  .command("latest")
  .alias("l")
  .option(
    "-l, --language [language]",
    "Language, default to English - en",
    "en"
  )
  .option(
    "-c, --count [count]",
    " Count of items to return",
    "1000"
  )
  .description("see the latest news.")
  .action(options => latestNews(options.language, options.count));

program.parse(process.argv);
