const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');

AWS.config.update({ region: process.env.TABLE_REGION });

const BASE_API_URL = 'https://api.github.com/graphql';
const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "fellowsdb";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "username";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/fellows/:username";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const query = username => `
{
  user(login: "${username}") {
    pullRequests(first: 5, orderBy: {field: CREATED_AT, direction: DESC}) {
      nodes {
        bodyHTML
        url
        title
        state
        createdAt
      }
    }
    issues(first: 5, orderBy: {field: CREATED_AT, direction: DESC}) {
      nodes {
        bodyHTML
        url
        title
        state
        createdAt
      }
    }
  }
}`;

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

const addRecentActivity = async user => {
  const q = query(user.username_original);
  const res = await fetch(BASE_API_URL,
    {
      method: 'post',
      headers: {
        Authorization: "bearer " + process.env.GITHUB_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: q })
    },
  );
  const json = await res.json();
  user.pullsActivity = json.data.user.pullRequests.nodes;
  user.issuesActivity = json.data.user.issues.nodes;
};

app.get(path, async function (req, res) {
  const params = {};

  if (req.params[partitionKeyName]) {
    req.params[partitionKeyName] = req.params[partitionKeyName].toLowerCase();
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }

    const getItemParams = {
      TableName: tableName,
      Key: params
    }

    dynamodb.get(getItemParams, async (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: 'Could not load items: ' + err.message });
      } else {
        if (data.Item) {
          await addRecentActivity(data.Item);
          res.json(data.Item);
        } else {
          res.json(data);
        }
      }
    });
  }
});

function _insert(user, cb) {
  let putItemParams = {
    TableName: tableName,
    Item: user
  }

  dynamodb.put(putItemParams, (err, data) => {
    if (err) console.error('error inserting data to db', err);
    cb(err ? false : true);
  });
}

app.put(path, function (req, res) {
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  const failedUsers = [];
  if (Array.isArray(req.body)) {
    for (let i = 0; i < req.body.length; i++) {
      const user = req.body[i];
      _insert(user, success => {
        if (!success) failedUsers.push(user);
      });
    }
  } else {
    _insert(req.body, success => {
      if (!success) failedUsers.push(user);
    });
  }

  if (failedUsers.length === 0) {
    res.json({ success: 'put call succeed!' })
  } else {
    res.json({ success: 'put call failed for one or more users!', failedUsers })
  }
});

app.post(path, function (req, res) {
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }

  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'post call succeed!', url: req.url, data: data })
    }
  });
});

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.delete(removeItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url });
    } else {
      res.json({ url: req.url, data: data });
    }
  });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
