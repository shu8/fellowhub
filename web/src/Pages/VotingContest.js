import React from "react";
import { Heading, Box, Text, StyledOcticon } from "@primer/components";
import {
  HeartFillIcon,
  RepoIcon,
  GitBranchIcon,
  StarFillIcon,
} from "@primer/octicons-react";
import bookPromo from "../img/book-promo.png";

export default function VotingContest() {
  return (
    <div style={{ backgroundColor: "", margin: "50px", width: "800px" }}>
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
      <Text as="p" sx={{ fontSize: 2 }}>
        A contest? Yes! What about? FellowHub is{" "}
        <b>holding a general election to find everyone's favorite fellow</b>.
      </Text>
      <Text as="p" sx={{ fontSize: 2 }}>
        Let's bring our community together to find who, out of all 160 fellows,
        is
        <b> the most loved fellow</b>: the most positive attitude, the most
        productive contributor, the most patient reviewer, the most diligent
        organizer,{" "}
        <b>
          the fellow who does the most to make the MLH Fellowship experience the
          best it can be — your favorite fellow
        </b>
        .
      </Text>
      <Text as="p" sx={{ fontSize: 2 }}>
        Based on the result of the voting contest, we will be{" "}
        <b>rewarding the Fellowship's favorite fellow</b> by helping them get a
        job! We have <b>real-world prizes</b> here in store. Read on to find out
        more!
      </Text>

      <Heading fontSize={4} mb={3} mt={5}>
        <StyledOcticon icon={RepoIcon} size={28} color="#1d539f" mr={1} /> Rules
      </Heading>
      <Box sx={{ fontSize: 2 }}>
        <ol style={{ marginLeft: "30px" }}>
          <li>
            Each fellow has a single vote to cast. Once cast, their vote is
            final, i.e. no takebacks.
          </li>
          <li>
            Votes are weighted so that a fellow's received votes are added to
            their own received votes. For example, if a fellow has received five
            votes, their vote is worth six votes.
          </li>
          <li>
            Each fellow <i>must</i> cast their vote. If a fellow has not voted
            by the end of the voting period, they cannot be picked as a winner.
          </li>
          <li>
            Only fellows can vote and be voted for, that is, MLH staff, mentors,
            maintainers, sponsors are excluded. FellowHub team members are
            excluded as well.
          </li>
          <li>
            Vote numbers remain secret until the results are announced. We can
            give access to an MLH admin so they can monitor that vote numbers
            are legit!
          </li>
        </ol>
        <div style={{ marginTop: "10px" }}>
          <b>
            The fellow who has received the most votes by the end of the voting
            period wins!
          </b>
        </div>
      </Box>

      <Heading fontSize={4} mb={3} mt={5}>
        <StyledOcticon icon={GitBranchIcon} size={28} color="#1d539f" mr={1} />{" "}
        Procedure
      </Heading>
      <Box sx={{ fontSize: 2 }}>
        Quick and simple! On the Fellowship Discord server, enter:
        <Text as="p" bg="gray.3" p={2} mt={2}>
          !votefor @DiscordUsername
        </Text>
        <Text as="p" sx={{ fontSize: 2 }}>
          And you have cast your vote!
        </Text>
        <Text as="p" sx={{ fontSize: 2 }}>
          The voting period runs from Monday, July 20th, to Thursday, July 23rd!
        </Text>
      </Box>

      <Heading fontSize={4} mb={3} mt={5}>
        <StyledOcticon icon={StarFillIcon} size={28} color="#1d539f" mr={1} />{" "}
        Prizes
      </Heading>
      <Box sx={{ fontSize: 2 }}>
        <Text>
          <b>
            The biggest prize is knowing that you are the most loved fellow of
            the entire 160-fellow Fellowship!
          </b>{" "}
          <StyledOcticon icon={HeartFillIcon} size={18} color="#1d539f" />
        </Text>
        <Text as="p" mt={2}>
          Added to that is the{" "}
          <b>Future Makers Creator Package, worth USD 250</b>, which includes:
        </Text>
        <ul
          style={{
            marginLeft: "30px",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          <li>
            The Coding Career Handbook by Swyx at{" "}
            <a href="https://www.learninpublic.org/#buy">LearnInPublic.org</a>
          </li>
          <li>
            Audio book + Bibliography →{" "}
            <a href="https://www.learninpublic.org/#files">Learn more</a>
          </li>
          <li>Updates + All future editions</li>
          <li>
            Lifetime Access to Coding Career Community →{" "}
            <a href="https://www.learninpublic.org/#community">Learn more</a>
          </li>
          <li>
            Special Creators' Channel in Community Discord with regular updates
            and discussions
          </li>
          <li>3+ hours of Author Commentary in high-quality recorded video</li>
          <li>
            10 Hours of Recorded Livestreams demonstrating Mise en Place Writing
          </li>
          <li>
            Upcoming Live Workshops →{" "}
            <a href="https://www.learninpublic.org/#workshops">Learn more</a>
          </li>
        </ul>
        Generously donated by <a href="https://twitter.com/swyx">Swyx</a>!
        <div style={{ marginTop: "20px" }}>
          <img src={bookPromo} />
        </div>
      </Box>
    </div>
  );
}
