const express = require("express");
const pool = require("./dbConn");

const app = express();

// for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Endpoint to check if prospective voter is eligible to vote.
 * // GET /check_vote?github_id=yashkumarverma */
app.get("/check_vote", async (req, res) => {
  try {
    const { github_id: githubId } = req.query;

    const result = await pool.query(
      `SELECT votes_available
      FROM vote_records
      WHERE github_id = $1;`,
      [githubId]
    );
    const votesAvailable = result.rows[0].votes_available;

    // usually either 1 or 0, but organizers get more for easier debugging
    if (votesAvailable >= 1) {
      // `votesReceived` are returned to be given to the recipient
      res.status(200).json({ isVoter: true, canVote: true });
    } else {
      res.status(200).json({ isVoter: true, canVote: false });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ isVoter: false });
  }
});

/**Endpoint for a voter to cast a vote for a recipient. The recipient receives the votes that the voter had received.
 * POST /cast_vote */
app.post("/cast_vote", async (req, res) => {
  try {
    const { voter, recipient } = req.body;
    console.log(voter);
    console.log(recipient);

    // reduce recipient's votes available by 1 (instead of resetting to zero)
    // this enables organizers to have more than 1 for testing
    await pool.query(
      `UPDATE vote_records
    SET votes_available = (
      SELECT votes_available
      FROM vote_records
      WHERE github_id = $1
    ) - 1
    WHERE github_id = $1;`,
      [voter]
    );

    // voter's votes_received are given to recipient!
    // recipient has own + received + 1
    await pool.query(
      `UPDATE vote_records
    SET votes_received = (
      SELECT votes_received FROM vote_records WHERE github_id = $1
    ) + (
      SELECT votes_received FROM vote_records WHERE github_id = $2
    ) + 1
    WHERE github_id = $1;`,
      [recipient, voter] // `votesReceived` from voter
    );

    await pool.query(
      `INSERT INTO logs (log) VALUES ($1);`,
      [`${voter} voted for ${recipient}`]
    );

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ success: false });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App listening on port ${port}`));
