const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const fetch = require('node-fetch');

const BASE_API_URL = 'https://www.googleapis.com/calendar/v3/calendars/';
const CALENDAR_ID = 'majorleaguehacking.com_pr3njjh4ok0pi93jfqm51jg2g0@group.calendar.google.com';

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/events', async (req, res) => {
  const response = await fetch(`${BASE_API_URL}${CALENDAR_ID}/events?key=${process.env.GOOGLE_API_KEY}`);
  const json = await response.json();
  res.json(json);
});

app.get('/events/:id', async (req, res) => {
  const response = await fetch(`${BASE_API_URL}${CALENDAR_ID}/events/${req.params.id}?key=${process.env.GOOGLE_API_KEY}`);
  const json = await response.json();
  res.json(json);
});

app.listen(3000, () => {
  console.log("App started");
});

module.exports = app;
