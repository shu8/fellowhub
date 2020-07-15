import React from "react";
import { Heading, Box } from "@primer/components";

export default function VotingContest() {
  return (
    <div style={{ backgroundColor: "", margin: "50px" }}>
      <Heading
        fontSize={6}
        mb={3}
        sx={{
          borderBottomWidth: 1,
          borderBottomColor: "border.gray",
          borderBottomStyle: "solid",
        }}
      >
        Voting Contest!
      </Heading>

      <Heading fontSize={4} mb={3}>
        Rules
      </Heading>
      <Box sx={{ fontSize: 2 }}>
        <ol style={{ marginLeft: "30px" }}>
          <li>
            Each fellow has a single vote to cast. Once cast, their vote is
            final, i.e. no takebacks.
          </li>
          <li>
            Votes are weighted so a fellow's received votes are added to their
            own vote. For example, if a fellow has received five votes, their
            vote is worth six votes.
          </li>
          <li>
            Each fellow must cast their vote. If a fellow has not voted by the
            end of the voting period, they cannot be picked as a winner.
          </li>
          <li>
            Only fellows can vote and be voted for, that is, MLH staff, mentors,
            maintainers, sponsors are excluded. In fairness, we three should be
            excluded as well.
          </li>
          <li>
            Vote numbers remain secret until the results are announced. We give
            access to an MLH admin so they can monitor that vote numbers are
            legit.
          </li>
          <li>The voting period is...</li>
        </ol>
      </Box>

      <Heading fontSize={4} mt={3} mb={3}>
        Procedure
      </Heading>
      <Box sx={{ fontSize: 2 }}>
        abc
      </Box>

      <Heading fontSize={4} mt={3} mb={3}>
        Prizes
      </Heading>
      <Box sx={{ fontSize: 2 }}>
        def
      </Box>
    </div>
  );
}
