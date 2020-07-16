const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "fellowsdb";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const path = "/discord-message";
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const getDiscordMessage = (data) => {
  switch (data.messageType) {
    case 'star':
      return { content: `Hey <@${data.recipientDiscordId}>, <@${data.senderDiscordId}> just starred your project \`${data.project}\` on GitHub!` };
    case 'linkedin':
      return { content: `Hey <@${data.recipientDiscordId}>, <@${data.senderDiscordId}> just endorsed you on LinkedIn!` };
    case 'mvf':
      return { content: `Hey <@${data.recipientDiscordId}>, you've made ${data.number} commits to open source projects this week, the most out of all the Fellows! Congratulations!` };
    default:
      return {};
  }
}

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post(path, function (req, res) {
  const sender = req.body.sender ? req.body.sender.toLowerCase() : null;
  const recipient = req.body.recipient ? req.body.recipient.toLowerCase() : null;

  dynamodb.scan({
    TableName: tableName,
    ScanFilter: {
      username: {
        AttributeValueList: [sender, recipient],
        ComparisonOperator: 'IN',
      },
    },
  }, async (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      const fellows = data.Items;

      const recipientFellow = fellows.find(u => u.username === recipient);
      const recipientDiscordId = recipientFellow ? recipientFellow.discord_id : null;

      const senderFellow = fellows.find(u => u.username === sender);
      const senderDiscordId = senderFellow ? senderFellow.discord_id : null;

      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getDiscordMessage({
            messageType: req.body.message_type,
            recipientDiscordId,
            senderDiscordId,
            project: req.body.project,
            number: req.body.number,
          })),
        });
        res.json({ success: true });
      } catch (err) {
        res.json({ success: false, err });
      }
    }
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from this file
module.exports = app;
