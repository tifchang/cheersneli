require("dotenv").config();
import { runResyJobs } from "./resy-api/src/monitor.ts"; 
require('./path').Message
const express = require("express");
const { App } = require("@slack/bolt");
const fs = require('fs')
let raw = fs.readFileSync('db.json');
let events= JSON.parse(raw);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN
});

app.message(/hi/, async ({ command, say }) => {
  try {
    say("Hi Neil 🙆‍♀️");
    runResyJobs();
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});



app.command("/next", async ({ command, ack, say }) => {
  try {
    await ack();
    say("Yaaay! that command works?");
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

// save data to db.json
// fs.readFile("db.json", function (err, data) {
//   const json = JSON.parse(data);
//   json.data.push(newFAQ);
//   fs.writeFile("db.json", JSON.stringify(json), function (err) {
//     if (err) throw err;
//     console.log("Successfully saved to db.json!");
//   });
// });



(async () => {
  const port = 3001
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
