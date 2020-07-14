import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Avatar } from "@primer/components";

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

const SimpleAvatar = ({
  bgPhoto,
  cta,
  ctaColor = "white",
  ctaBg = "#006EFE",
}) => (
  <div className='custom-avatar'>
    <Avatar src={bgPhoto} size={100} mb={4} />
    {cta && (
      <CTA bgColor={ctaBg} color={ctaColor} className='cta'>
        <CTAText>{cta}</CTAText>
      </CTA>
    )}
  </div>
);

SimpleAvatar.propTypes = {
  bgPhoto: PropTypes.string,
  cta: PropTypes.string,
  ctaColor: PropTypes.string,
  ctaBg: PropTypes.string,
};

export default SimpleAvatar;
