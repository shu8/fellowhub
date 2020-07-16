import React from "react";
import styled from "styled-components";
import { Avatar } from "@primer/components";
import { useHistory } from "react-router-dom";

const CTA = styled.div`
  font-size: 15px;
  background-color: ${(props) => props.bgColor};
  padding: 5px 0px;
  text-align: center;
  cursor: pointer;
  width: 100px;
  margin-top: -54px;
  opacity: 0;
  z-index: 2;
  position: relative;
  color: ${(props) => props.color};
`;

const CTAText = styled.span`
  font-weight: 500;
`;

export default function SimpleAvatar({
  bgPhoto,
  cta,
  ctaColor = "white",
  ctaBg = "#006EFE",
  ctaUrl,
} = {}) {
  const history = useHistory();
  const handleCTAClick = () => {
    if (ctaUrl) history.push(ctaUrl);
  };

  return (
    <div className="custom-avatar">
      <Avatar src={bgPhoto} size={100} mb={4} />
      {cta && (
        <CTA
          bgColor={ctaBg}
          color={ctaColor}
          className="cta"
          onClick={handleCTAClick}
        >
          <CTAText>{cta}</CTAText>
        </CTA>
      )}
    </div>
  );
}
