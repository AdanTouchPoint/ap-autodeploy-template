import React, { useState, useEffect } from "react";
import Share from "./Share";

const ThankYou = ({
  typData,
  setActiveSection,
  colors
}) => {
  const click = (e) => {
    e.preventDefault();
    setActiveSection("main-form")
  };
  return (
    <div className={"container typ-container"}>      
        <div className="typ-content">
          <h3 className="typ-message">
            {typData.tymessage?.text
              ? typData.tymessage.text
              : "Please Insert Thank you Message"}
          </h3>
          <h5 className="second-typ-message">
            {typData.tymessage2?.text
              ? typData.tymessage2.text
              : "Please Insert Thank you Message 2"}
          </h5>
          
          <h5 className="share-text">
            {typData.shareText?.text
              ? typData.shareText?.text
              : "Please Insert share label"}
          </h5>
          <Share
            shareUrl={typData.shareUrl?.text}
            shareMessage={typData.shareMessage?.text}
            colors={colors}
          />

          <span
            id="repeatButton-typView"
            onClick={click}
            className="capitalize-style link-simulation do-again-btn"
          >
            Contact More Politicians!
          </span>
        </div>
    </div>
  );
};

export default ThankYou;