import React from "react";
import { BorderBox } from "@primer/components";
import { Heading, Text, StyledOcticon } from "@primer/components";
import { BriefcaseIcon, MarkGithubIcon } from "@primer/octicons-react";

export const PodmateAvatar = (mate) => {
  mate = mate.mate; // no idea why
  return (
    <div>
      <BorderBox style={{ padding: "20px", marginBottom: "10px" }}>
        <div class="d-table col-12">
          <div class="col-2 d-table-cell v-align-middle">
            <img
              class="width-full avatar"
              src={mate.avatar_url}
              alt={mate.username}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </div>
          <div class="col-10 d-table-cell v-align-middle pl-4">
            <Heading fontSize={3} mb={2} mt={2} color="#1d539f">
              {mate.name || mate.username}
            </Heading>
            <Text as="p" sx={{ fontSize: 2 }}>
              <b>Skills</b>:{" "}
              <span style={{ color: "#808080" }}>
                {mate.skills.replace(/,/g, "・")}
              </span>
            </Text>
            <Text as="p" sx={{ fontSize: 1 }}>
              <a
                class="text-gray text-small"
                href={mate.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StyledOcticon
                  icon={MarkGithubIcon}
                  size={18}
                  color="#1d539f"
                  mr={2}
                />{" "}
                GitHub profile
              </a>
            </Text>
            <Text as="p" sx={{ fontSize: 1 }}>
              <a
                class="text-gray text-small"
                href={"https://www.linkedin.com/in/" + mate.linkedin_id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StyledOcticon
                  icon={BriefcaseIcon}
                  size={18}
                  color="#1d539f"
                  mr={2}
                />
                LinkedIn profile
              </a>
            </Text>
          </div>
        </div>
      </BorderBox>
    </div>
  );
};
