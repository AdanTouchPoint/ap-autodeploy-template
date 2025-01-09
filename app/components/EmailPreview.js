"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import { fetchData } from "../assets/petitions/fetchData";
import { fetchLeads } from "../assets/petitions/fetchLeads";

const EmailPreview = ({
  dataUser,
  setActiveSection,
  emailData,
  clientId,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  mainData,
  allDataIn,
}) => {
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const errorHandler = (message) => {
    return <Alert variant="danger">{message}</Alert>;
  };
    const verifyData = async (dataUser) =>{
      const { subject, message } = await dataUser;
      if (
        subject === undefined ||
        message === undefined ||
        subject === "" ||
        message === ""
      ) {
        setValid(false)
        setError("form");
        const options = {
          duration: 100,
          smooth: true,
        };
        scroll.scrollToTop(options)
        return false
      }
      return true
    }
  const handleSend = async (e) => {
    e.preventDefault();
    const { subject, message, emailUser, userName } = await dataUser;
    setError("");
    const validData = await verifyData(dataUser);
    if (validData === false) {
      setError("form");
      return;
    }
    let currentSubject = dataUser.subject;
    const messageEmail = dataUser.message.replace(/\n\r?/g, "<br/>");
    const payload = await fetchData(
      "GET",
      backendURLBaseServices,
      endpoints.toSendBatchEmails,
      clientId,
      `to=${
        allDataIn.length > 0 ? allDataIn : emailData.email
      }&subject=${currentSubject}&firstName=${userName}&emailData=${emailUser}&text=${encodeURIComponent(
        messageEmail
      )}`
    );

    if (payload.success === true) {
      fetchLeads(
        true,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        emailData,
        messageEmail,
        "email-send-lead"
      );
      setActiveSection("typ");
    }
    if (payload.success !== true) {
      fetchLeads(
        false,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        emailData,
        messageEmail,
        "message-multiple-representatives-not-sended-lead"
      );
      setError("email");
    }
    return;
  };
  const back = (e) => {
    e.preventDefault();
    setActiveSection("emailForm");
  };
  return (
    <>
      <div className={"emailContainer"}>
        {error === "form"
          ? errorHandler("llena todos los campos")
          : error === "email"
          ? errorHandler("nose envio el email ")
          : null}
        <p>Instructions</p>
        <div className="email-sheet">
          <h3>{dataUser?.subject}</h3>
          <pre><p>{dataUser?.message}</p></pre>
        </div>
        <div
          className={
            "container buttons-container-email-form btn-container-checklist"
          }
        >
          <Button onClick={back} className={"button-email-form back-button"}>
            Back
          </Button>

          <Button
            onClick={handleSend}
            className={"continue-button btn btn-primary btn-lg"}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailPreview;
