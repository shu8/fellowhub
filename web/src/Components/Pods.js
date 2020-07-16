import React from "react";
import { BorderBox } from "@primer/components";
import { Heading, Text, StyledOcticon } from "@primer/components";
import { MarkGithubIcon } from "@primer/octicons-react";
import logo001 from "../img/podLogos/001.png";
import logo002 from "../img/podLogos/002.png";
import logo011 from "../img/podLogos/011.png";
import logo012 from "../img/podLogos/012.png";
import logo021 from "../img/podLogos/021.png";
import logo022 from "../img/podLogos/022.png";
import logo031 from "../img/podLogos/031.jpg";
import logo032 from "../img/podLogos/032.png";
import logo041 from "../img/podLogos/041.png";
import logo042 from "../img/podLogos/042.png";
import logo051 from "../img/podLogos/051.png";
import logo052 from "../img/podLogos/052.png";
import logo061 from "../img/podLogos/061.png";
import logo062 from "../img/podLogos/062.png";
import logoStaff from "../img/podLogos/staff.jpg";
import logoMentors from "../img/podLogos/mentors.png";
import {
  HourglassIcon,
  GitCompareIcon,
  MegaphoneIcon,
  PencilIcon,
} from "@primer/octicons-react";

const Pods = ({ fellows }) => {
  const pods = {
    "0.0.1": [],
    "0.0.2": [],
    "0.1.1": [],
    "0.1.2": [],
    "0.2.1": [],
    "0.2.2": [],
    "0.3.1": [],
    "0.3.2": [],
    "0.4.1": [],
    "0.4.2": [],
    "0.5.1": [],
    "0.5.2": [],
    "0.6.1": [],
    "0.6.2": [],
    "MLH Staff": [],
    Mentors: [],
  };

  const imageMapping = {
    "0.0.1": logo001,
    "0.0.2": logo002,
    "0.1.1": logo011,
    "0.1.2": logo012,
    "0.2.1": logo021,
    "0.2.2": logo022,
    "0.3.1": logo031,
    "0.3.2": logo032,
    "0.4.1": logo041,
    "0.4.2": logo042,
    "0.5.1": logo051,
    "0.5.2": logo052,
    "0.6.1": logo061,
    "0.6.2": logo062,
    "MLH Staff": logoStaff,
    Mentors: logoMentors,
  };

  const projectMapping = {
    "0.0.1": ["Homebrew", "Dev.to", "OhMyZsh"],
    "0.1.1": ["CircuitPython", "BeagleBoard", "AliceVision"],
    "0.1.2": ["Keras", "BentoML", "scikit-learn"],
    "0.2.1": ["Babel", "Webaverse", "Sheet.js"],
    "0.2.2": ["Docsify", "AWS Amplify", "n8n"],
    "0.3.1": ["Julia", "SciML"],
    "0.3.2": ["Next.js", "Docusaurus", "World Food Programme's PRISM project"],
    "0.4.1": ["React", "React Native", "Relay"],
    "0.4.2": ["Jest", "react-jsonschema-form"],
    "0.5.1": [
      "HTTPie",
      "Pallets/Flask",
      "Pallets/Werkzeug",
      "Pallets/Jinja",
      "Pallets/Click",
    ],
    "0.5.2": ["FastAPI", "Typer", "howdoi"],
  };

  const getPodGithubUrl = (podId) => {
    const formattedPodId = podId.replace(/\./g, "-");
    return `https://github.com/orgs/MLH-Fellowship/teams/pod-${formattedPodId}`;
  };

  fellows.forEach((fellow) => pods[fellow.pod_id].push(fellow));

  return (
    <BorderBox style={{ padding: "20px" }}>
      {Object.keys(pods).map((podId) => {
        console.log(imageMapping[podId]);
        return (
          <div class="d-table col-12" style={{ marginBottom: "15px" }}>
            <div class="col-2 d-table-cell v-align-middle">
              <img
                class="width-full avatar"
                src={imageMapping[podId]}
                alt="-"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </div>
            <div class="col-10 d-table-cell v-align-middle pl-4">
              <Heading fontSize={3} mb={2} mt={2} color="#1d539f">
                Pod {podId}
              </Heading>
              <Text as="p" sx={{ fontSize: 2 }}>
                <b>Podmates</b>:{" "}
                <span style={{ color: "#808080" }}>
                  {pods[podId].map((fellow, index) => (
                    <span>
                      {(fellow.name || fellow.username) +
                        (index === pods[podId].length - 1 ? "" : " · ")}
                    </span>
                  ))}
                </span>
                <br />
                {projectMapping[podId] === undefined ? null : (
                  <>
                    <b>Projects</b>:{" "}
                    <span style={{ color: "#808080" }}>
                      {projectMapping[podId].map((project, index) => (
                        <span>
                          {project +
                            (index === projectMapping[podId].length - 1
                              ? ""
                              : " · ")}
                        </span>
                      ))}
                    </span>
                  </>
                )}
              </Text>
              <Text as="p" sx={{ fontSize: 1 }}>
                <a
                  class="text-gray text-small"
                  href={getPodGithubUrl(podId)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StyledOcticon
                    icon={MarkGithubIcon}
                    size={18}
                    color="#1d539f"
                    mr={2}
                  />
                  Pod's GitHub
                </a>
              </Text>
            </div>
          </div>
        );
      })}
    </BorderBox>
  );
};

export default Pods;
