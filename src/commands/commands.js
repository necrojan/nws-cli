const fetch = require("node-fetch");
const chalk = require("chalk");
const terminaLink = require("terminal-link");

require("dotenv").config();

const url = "https://api.currentsapi.services/v1";
const languages = {
  Arabic: "ar",
  Chinese: "zh",
  Dutch: "nl",
  English: "en",
  Finnish: "fi",
  French: "fr",
  German: "de",
  Hindi: "hi",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Malay: "msa",
  Portuguese: "pt",
  Russian: "ru",
  Spanish: "es"
};

const latestNews = async (language, count) => {
  const getKeyByValue = lang => {
    return Object.keys(languages).find(key => languages[key] == lang);
  };

  const found = Object.keys(languages).some(key => {
    return languages[key] == language;
  });

  if (!found) {
    console.log(chalk.red("Language given not found."));
    return;
  }

  const response = await fetch(
    `${url}/latest-news?language=${language}&apiKey=${process.env.API_KEY}`
  );

  const data = await response.json();

  if (data.status != "ok") {
    console.log(data, "error");
  }
  console.log(
    chalk.black.bgGreenBright.bold(
      "------------------------- Latest News -----------------------------"
    )
  );
      console.log('\n');
  console.log(chalk.yellow(`Language is in ${getKeyByValue(language)}\n`));

  const filteredData = data.news.slice(0, Number(count)).map((obj, idx) => {
    return {
      id: idx + 1,
      title: obj.title,
      description: obj.description,
      url: obj.url,
      author: obj.author
    };
  });

  filteredData.forEach(ele => {
    console.log(ele.id, terminaLink(ele.title, ele.url));
    console.log("By: ", ele.author);
    console.log(ele.description);
    console.log('\n');
  });
};

module.exports = {
  latestNews
};
