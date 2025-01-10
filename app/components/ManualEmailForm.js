"use client";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/cjs/Col";
import { animateScroll as scroll } from "react-scroll";
import Alert from "react-bootstrap/Alert";
import { fetchLeads } from "../assets/petitions/fetchLeads";  
const ManualEmailForm = ({
  setActiveSection,
  dataUser,
  setDataUser,
  mainData,
  backendURLBase,
  endpoints,
  clientId,
  emailData
}) => {
  useEffect(() => {
    const text = mainData.emailform?.message?.text
    const sub =  mainData.emailform?.subject?.text 
    setDataUser({
      ...dataUser,
      message: text,
      subject: sub,
    });
  }, []);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const errorHandler = (message) => {
    return (
      <Alert variant="danger">
        {message}
      </Alert>
    );
  };
  const handleMessageChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      subject: e.target.name === "subject" ? e.target.value : dataUser.subject,
      message: e.target.name === "message" ? e.target.value : dataUser.message,
    });
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
  const click = async (e) => {
    e.preventDefault();
    setError("")
    const validData = await verifyData(dataUser)
    if (validData === false ) {
      setError("form")
      return
    }
    fetchLeads(
      true,
      backendURLBase,
      endpoints,
      clientId,
      dataUser,
      emailData,
      "NA",
      "email-write-lead"
    );
    setActiveSection("emailPreview")
  };
  const back = (e) => {
    e.preventDefault();
    setActiveSection("mainform");
  };
  return (
    <>
      {
        <div className={"emailContainer"}>
          {error === "form"
            ? errorHandler("llena todos los campos")
            : error === "email"
            ? errorHandler("nose envio el email ")
            : null}
          <Form
            name="fm-email"
            onSubmit={click}
            noValidate
            validated={valid}
          >
            <div>
              <>
                <h3 className="ia-instructions-title main-text-title">
                  {mainData.titleNoAI ? mainData.titleNoAI : "Write your email"}
                </h3>
                <p className="ia-instructions-p main-text-instruction">
                  {mainData.intructionsNoAI
                    ? mainData.intructionsNoAI
                    : "Customer instructions for the user. Here the client can give the user recommendations on what to mention in the email and how to write the subject."}
                </p>
              </>
              <div>
                <div>
                  <Col>
                    <Form.Group>
                      <Form.Label className="subject-label">
                        Subject Line
                      </Form.Label>
                      <Form.Control
                        id="subject-emailform"
                        onChange={handleMessageChange}
                        name="subject"
                        type="text"
                        defaultValue={dataUser.subject}
                        className="subject-input"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="subject-label">Email</Form.Label>
                      <Form.Control
                        id="message-emailform"
                        onChange={handleMessageChange}
                        as="textarea"
                        rows={12}
                        name="message"
                        defaultValue={dataUser.message}
                        className="email-ia-text-area"
                        required
                      />
                    </Form.Group>
                  </Col>
                </div>
                <div
                  className={
                    "container buttons-container-email-form btn-container-checklist"
                  }
                >
                  <Button
                    onClick={back}
                    className={"button-email-form back-button"}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={click}
                    className={"continue-button btn btn-primary btn-lg"}
                  >
                    Send!
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      }
    </>
  );
};

export default ManualEmailForm;
