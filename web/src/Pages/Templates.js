import React from "react";
import { Heading, Text, StyledOcticon, Label } from "@primer/components";
import {
  ZapIcon,
  InboxIcon,
  InfoIcon,
  CrossReferenceIcon,
  ChecklistIcon,
  BriefcaseIcon,
  BookmarkFillIcon,
} from "@primer/octicons-react";
import Loading from "../Components/Loading";
import Login from "../Components/Login";

const getSkill = (string, number) => string.split(",")[number];

export default function Templates(props) {
  console.log(props.fellow)
  if (!props.accessToken) return (<Login />);

  return (
    <div className="App">
      {!props.fellow ? (
        <Loading />
      ) : (
          <>
          <Heading fontSize={7} mb={3}>
            Jobhunt Templates!
          </Heading>

          {/* blitz pitch */}
          <Heading fontSize={4} mb={3} mt={5}>
            <StyledOcticon icon={ZapIcon} size={28} color="#1d539f" mr={1} />{" "}
            Blitz Pitch Template
          </Heading>

          <Text as="div" sx={{ fontSize: 2 }}>
            Hey{" "}
            <Label variant="large" bg="yellow.3" color="black">
              CONTACT_NAME
            </Label>
            , I know your time is valuable, so only three bullet points:
            <ul
              style={{
                marginLeft: "30px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <li>
                {" "}
                Programming since{" "}
                <Label variant="large" bg="yellow.3" color="black">
                  INITIAL_YEAR_OF_PROGRAMMING
                </Label>
                .
              </li>{" "}
              <li>
                Most experienced in{" "}
                <Label variant="large" bg="green.4" color="black">
                  {getSkill(props.fellow.skills, 0)}
                </Label>
                ,{" "}
                <Label variant="large" bg="green.4" color="black">
                  {getSkill(props.fellow.skills, 1)}
                </Label>{" "}
                and{" "}
                <Label variant="large" bg="green.4" color="black">
                  {getSkill(props.fellow.skills, 2)}
                </Label>
                .
              </li>{" "}
              <li>
                Seeking to work at{" "}
                <Label variant="large" bg="yellow.3" color="black">
                  COMPANY_NAME
                </Label>{" "}
                this summer as junior. How?
              </li>
            </ul>
            Thanks!
            <br />
            <Label variant="large" bg="green.4" color="black">
              {props.fellow.name}
            </Label>
          </Text>

          {/* casual email */}
          <Heading fontSize={4} mb={3} mt={5}>
            <StyledOcticon icon={InboxIcon} size={28} color="#1d539f" mr={1} />{" "}
            Casual E-Mail Template
          </Heading>

          <Text as="div" sx={{ fontSize: 2 }}>
            <p>
              Hi{" "}
              <Label variant="large" bg="yellow.3" color="black">
                CONTACT_NAME
              </Label>
              ,
            </p>

            <p>
              My name is{" "}
              <Label variant="large" bg="green.4" color="black">
                {props.fellow.name}
              </Label>{" "}
              and I saw you're looking for{" "}
              <Label variant="large" bg="yellow.3" color="black">
                POSITION
              </Label>
              . I'll keep it short as I know you might be busy. Please find
              attached my CV and here's my GitHub and LinkedIn. I would love to
              speak with you to tell you more about my background and experience
              and to potentially start the interview process.
            </p>

            <p>If you think I might be of help, please let me know!</p>

            <p>
              <Label variant="large" bg="green.4" color="black">
                {props.fellow.name}
              </Label>
            </p>

            <p>
              <Label variant="large" bg="green.4" color="black">
                https://github.com/{props.fellow.username}
              </Label>
            </p>
            <p>
              <Label variant="large" bg="green.4" color="black">
                https://linkedin.com/in/{props.fellow.linkedin_id}
              </Label>
            </p>
          </Text>

          {/* cover letter */}
          <Heading fontSize={4} mb={3} mt={5}>
            <StyledOcticon
              icon={BookmarkFillIcon}
              size={28}
              color="#1d539f"
              mr={1}
            />{" "}
            Cover Letter Template
          </Heading>
          <Text as="div" sx={{ fontSize: 2 }}>
            <p>
              Dear{" "}
              <Label variant="large" bg="yellow.3" color="black">
                CONTACT_NAME
              </Label>
              ,
            </p>
            <p>
              I am writing to apply for your{" "}
              <Label variant="large" bg="yellow.3" color="black">
                POSITION
              </Label>{" "}
              at{" "}
              <Label variant="large" bg="yellow.3" color="black">
                COMPANY_NAME
              </Label>
              . I learned about it recently from{" "}
              <Label variant="large" bg="yellow.3" color="black">
                RECRUITER_NAME
              </Label>{" "}
              on{" "}
              <Label variant="large" bg="yellow.3" color="black">
                JOB BOARD NAME
              </Label>
              .
            </p>
            <p>
              When I am not studying, I am contributing to OSS and building side
              projects for fun, many in the{" "}
              <Label variant="large" bg="green.4" color="black">
                {getSkill(props.fellow.skills, 0)}
              </Label>{" "}
              ecosystem and based around playing with{" "}
              <Label variant="large" bg="yellow.3" color="black">
                RELEVANT TOPIC
              </Label>
              . And these days I always start with{" "}
              <Label variant="large" bg="green.4" color="black">
                {getSkill(props.fellow.skills, 1)}
              </Label>{" "}
              and{" "}
              <Label variant="large" bg="green.4" color="black">
                {getSkill(props.fellow.skills, 2)}
              </Label>
              ! My most recent project{" "}
              <Label variant="large" bg="yellow.3" color="black">
                DESCRIPTION_OF_RECENT_PROJECT
              </Label>
              . I also enjoy learning the ins and outs of{" "}
              <Label variant="large" bg="green.4" color="black">
                {getSkill(props.fellow.skills, 3)}
              </Label>{" "}
              and writing about them.
            </p>
            I have experience working remotely, I can offer full-time
            availability, and I am based in{" "}
            <Label variant="large" bg="yellow.3" color="black">
              FELLOW_LOCATION
            </Label>
            . If you have a coding challenge to test your candidates, I'd be
            happy to take it on.
            <br />I look forward to hearing from you!
            <br />
            <br />
            Sincerely,
            <br />
            <p>
              <Label variant="large" bg="green.4" color="black">
                {props.fellow.name}
              </Label>
            </p>
            <p>
              <Label variant="large" bg="green.4" color="black">
                https://github.com/{props.fellow.username}
              </Label>
            </p>
            <p>
              <Label variant="large" bg="green.4" color="black">
                https://linkedin.com/in/{props.fellow.linkedin_id}
              </Label>
            </p>
          </Text>

          {/* CV section */}
          <Heading fontSize={4} mb={3} mt={5}>
            <StyledOcticon
              icon={ChecklistIcon}
              size={28}
              color="#1d539f"
              mr={1}
            />{" "}
            CV Section Template
          </Heading>
          <Text as="div" sx={{ fontSize: 2 }}>
            <p>
              <b>Major League Hacking</b>
            </p>
            <p>MLH Fellow — June 2020 to September 2020</p>
            <ul
              style={{
                marginLeft: "30px",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <li>
                {" "}
                Selected by MLH out of 20,000 candidates to contribute to Open Source Software under the
                guidance of professional software engineers for three months
              </li>
              <li>
                {" "}
                Participated in standups, code reviews, 1-on-1s, talks,
                workshops and teambuilding exercises.
              </li>
              <li>
                {" "}
                Completed{" "}
                <Label variant="large" bg="yellow.3" color="black">
                  LARGE_FEATURE
                </Label>{" "}
                as a greenfield original contribution to{" "}
                <Label variant="large" bg="yellow.3" color="black">
                  PROJECT
                </Label>
                .
              </li>
            </ul>
          </Text>

          {/* LinkedIn message */}
          <Heading fontSize={4} mb={3} mt={5}>
            <StyledOcticon
              icon={CrossReferenceIcon}
              size={28}
              color="#1d539f"
              mr={1}
            />
            LinkedIn Message Template
          </Heading>

          <Text as="div" sx={{ fontSize: 2 }}>
            <p>
              <b>Subject:</b> Interested in{" "}
              <Label variant="large" bg="yellow.3" color="black">
                POSITION
              </Label>{" "}
              opportunity at{" "}
              <Label variant="large" bg="yellow.3" color="black">
                COMPANY_NAME
              </Label>
            </p>

            <p>
              Hi{" "}
              <Label variant="large" bg="yellow.3" color="black">
                CONTACT_NAME
              </Label>
              ,
            </p>

            <p>
              I'm a{" "}
              <Label variant="large" bg="green.4" color="black">
                {getSkill(props.fellow.skills, 0)}
              </Label>{" "}
              developer with{" "}
              <Label variant="large" bg="yellow.3" color="black">
                YEARS
              </Label>{" "}
              years of experience.
            </p>

            <p>
              I'm writing because I just saw you posted a job for{" "}
              <Label variant="large" bg="yellow.3" color="black">
                POSITION
              </Label>{" "}
              at{" "}
              <Label variant="large" bg="yellow.3" color="black">
                COMPANY_NAME
              </Label>{" "}
              - I've been following your company for quite some time now, as I'm
              impressed by the work you all do. I would love to connect and
              learn more about the job posting at{" "}
              <Label variant="large" bg="yellow.3" color="black">
                COMPANY_NAME
              </Label>
              . Please let me know if you would be open for a quick conversation
              in the next week or so.
            </p>

            <p>Thank you and I look forward to speaking with you!</p>

            <p>Thanks!</p>

            <p>
              <Label variant="large" bg="green.4" color="black">
                {props.fellow.name}
              </Label>
            </p>

            <p>
              <Label variant="large" bg="green.4" color="black">
                https://github.com/{props.fellow.username}
              </Label>
            </p>
            <p>
              <Label variant="large" bg="green.4" color="black">
                https://linkedin.com/in/{props.fellow.linkedin_id}
              </Label>
            </p>
          </Text>

          {/* LinkedIn message */}
          <Heading fontSize={4} mb={3} mt={5}>
            <StyledOcticon icon={InfoIcon} size={28} color="#1d539f" mr={1} />{" "}
            CV Application Followup Template
          </Heading>
          <Text>
            <p>
              {" "}
              Hi{" "}
              <Label variant="large" bg="yellow.3" color="black">
                CONTACT_NAME
              </Label>
              !
            </p>

            <p>
              I just wanted to let you know, last week I also interviewed with{" "}
              <Label variant="large" bg="yellow.3" color="black">
                OTHER_COMPANY_NAME
              </Label>{" "}
              and I just received an offer today - I need to get back to them as
              soon as possible. I'm forwarding the offer from{" "}
              <Label variant="large" bg="yellow.3" color="black">
                OTHER_COMPANY_NAME
              </Label>{" "}
              as proof.
            </p>

            <p>
              I'm really excited about the opportunity at{" "}
              <Label variant="large" bg="yellow.3" color="black">
                COMPANY_NAME
              </Label>
              , as I applied to you first, so I wanted to know if you had a
              chance to look at the application I submitted. If it were up to
              me, there'd be no rush, but I have to decide soon!
            </p>

            <p>Thanks!</p>

            <p>
              <Label variant="large" bg="green.4" color="black">
                {props.fellow.name}
              </Label>
            </p>

            <p>
              <Label variant="large" bg="green.4" color="black">
                https://github.com/{props.fellow.username}
              </Label>
            </p>
            <p>
              <Label variant="large" bg="green.4" color="black">
                https://linkedin.com/in/{props.fellow.linkedin_id}
              </Label>
            </p>
          </Text>

          {/* LinkedIn templates */}
          <Heading fontSize={4} mb={3} mt={5}>
            <StyledOcticon
              icon={BriefcaseIcon}
              size={28}
              color="#1d539f"
              mr={1}
            />{" "}
            LinkedIn Recommendation Templates
          </Heading>

          <div>
            <Text as="p" sx={{ fontSize: 2 }}>
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              is beyond amazing at{" "}
              <Label variant="large" bg="blue.3" color="black">
                SKILL
              </Label>
              ! They are so well-organized, practical and quick on the uptake -
              all critical attributes when rushing through a hackathon to get a
              project off the ground! It was a pleasure working with{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              and I'd pick them to be on my team again anytime.
            </Text>
            <br />

            <br />

            <Text as="p" sx={{ fontSize: 2 }}>
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              is my go-to person when it comes to{" "}
              <Label variant="large" bg="blue.3" color="black">
                SKILL
              </Label>
              . Whenever I need{" "}
              <Label variant="large" bg="blue.3" color="black">
                TASK_DESCRIPTION
              </Label>
              , the first person I think of for reaching out to is{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>
              . We collaborated for three months during the MLH Fellowship, and
              on top of being a great{" "}
              <Label variant="large" bg="blue.3" color="black">
                ROLE
              </Label>
              ,{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              is also such an easy-going person!
            </Text>
            <br />

            <br />

            <Text as="p" sx={{ fontSize: 2 }}>
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              is such a nice person to have around. They are not only a great
              teammate (or podmate, as we call them in the MLH Fellowship!) but
              also a very good{" "}
              <Label variant="large" bg="blue.3" color="black">
                ROLE
              </Label>{" "}
              with years of relevant experience at{" "}
              <Label variant="large" bg="blue.3" color="black">
                SKILL
              </Label>
              . Creative, hands-on, organized... you name it! Whether I need
              help with{" "}
              <Label variant="large" bg="blue.3" color="black">
                SKILL
              </Label>{" "}
              or just someone open to discuss ideas and suggestions -{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              is always top of mind.
            </Text>
            <br />

            <br />

            <Text as="p" sx={{ fontSize: 2 }}>
              During the MLH Fellowship, I shared a team with{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              and we worked on{" "}
              <Label variant="large" bg="blue.3" color="black">
                PROJECT
              </Label>
              . His deliverables, dare I say, were always very well executed, on
              time and done with great care. They were an inspiration to the
              rest of the team, always going the extra mile and finding great
              ways to quickly put problems to bed. I’d definitely work with{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              again.
            </Text>
            <br />

            <br />

            <Text as="p" sx={{ fontSize: 2 }}>
              It is only rarely that I come across raw talents who stand out
              like{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>
              . I had the pleasure of working with them for three months at the
              MLH Fellowship, collaborating on several issues. Their ability to
              handle so many issues was unlike any I've seen before or since -
              their work sharply increased the productivity in our team. As a
              team member or as a leader,{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              has only my highest recommendation.
            </Text>
            <br />

            <br />

            <Text as="p" sx={{ fontSize: 2 }}>
              "Out of this world" is the phrase that comes to mind when I think
              of{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>
              . I've had the pleasure of hacking with them for three months
              during the MLH Fellowship and, above all, I was impressed with
              their ability to{" "}
              <Label variant="large" bg="blue.3" color="black">
                TASK_DESCRIPTION
              </Label>
              , and of course their innate curiosity!{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              is a true asset for any positions requiring{" "}
              <Label variant="large" bg="blue.3" color="black">
                SKILL
              </Label>{" "}
              and has my warmest recommendation.”
            </Text>
            <br />

            <br />

            <Text as="p" sx={{ fontSize: 2 }}>
              I consider myself extremely lucky to have worked with{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>
              , from whom I learned so much during the MLH Fellowship. Always
              going above and beyond in looking for opportunities for our team.
              And because of their "lifelong learning" mindset, they're also
              eager to learn so much all the time! I'm very much looking forward
              to working with{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              again!
            </Text>
            <br />

            <br />

            <Text as="p" sx={{ fontSize: 2 }}>
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              is a fountain of ideas! Incredibly proactive in coming up with
              experiments to test out and pitch to our team. During the MLH
              Fellowship,{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              proposed to the project maintainers that our team do a{" "}
              <Label variant="large" bg="blue.3" color="black">
                TASK_DESCRIPTION
              </Label>{" "}
              - and{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              went ahead and secured their approval, helped organize the team,
              and the end result deeply impressed and exceeded everyone's
              expectations! Working with{" "}
              <Label variant="large" bg="blue.3" color="black">
                RECOMMENDED_FELLOW
              </Label>{" "}
              is going to be one of my fondest memories from my time at the MLH
              Fellowship.
            </Text>
            <br />
            <br />
          </div>
        </>
      )}
    </div>
  );
}
