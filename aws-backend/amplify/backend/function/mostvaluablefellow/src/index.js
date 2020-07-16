const fetch = require("node-fetch");

// Call the Heroku endpoint every week
exports.handler = async (event) => {
  const res = await fetch('https://fellowhub.herokuapp.com/mvf-trigger', { method: 'POST' });
  console.log(await res.json());
};
