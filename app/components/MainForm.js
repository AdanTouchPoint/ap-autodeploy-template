"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import ListSelect from "./ListSelect";
import ThankYou from "./ThankYou";
import {  animateScroll as scroll } from "react-scroll";
import LoadingMainForm from "./LoadingMainForm";
import ManualEmailForm from "./ManualEmailForm";
import EmailPreview from "./EmailPreview";
const MainForm = ({
  dataUser,
  setDataUser,
  setEmailData,
  emailData,
  clientId,
  states,
  typData,
  mainData,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  allDataIn,
  setAllDataIn,
  colors,
  emails,
}) => {
  const [activeSection, setActiveSection] = useState('');
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [tac, setTac] = useState(false);
  const title = mainData.mainform?.title?.text;
  const instructions = mainData.mainform?.instructions?.text;
  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };
  const renderListSelectSection = () =>{
    return(
      <div className={"container senators-container"}>
      <div className="representatives-container">
        {
          <ListSelect
            setActiveSection={setActiveSection}
            setError={setError}
            setValidated={setValidated}
            emails={emails}
            tac={tac}
            emailData={emailData}
            setEmailData={setEmailData}
            dataUser={dataUser}
            clientId={clientId}
            setAllDataIn={setAllDataIn}
            backendURLBase={backendURLBase}
            endpoints={endpoints}
          />
        }
      </div>
    </div>
    )
  }
  const renderMainFormSection = () => {
    const handleTerms = (e) => {
      if (e.target.checked === true) {
        setTac(true);
      } else {
        setTac(false);
      }
    };
    const handleChange = (e) => {
      e.preventDefault();
      setDataUser({
        ...dataUser,
        [e.target.name]: e.target.value,
      });
    };
    const isValidEmail = (email) => {
      if (!email) {
        return false;
      }
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email.trim());
    };
    return(
      <div className={"container container-content"}>
      {error ? (
        <Alert variant={"danger"}>
          Please fill all fields. Also, please make sure there are no spaces
          before of after your email or postcode.
        </Alert>
      ) : null}
      <Form
        name="fm-find"
        noValidate
        validated={validated}
      >
        <div className="instructions-container">
          <h3 className="main-texts-color main-text-title">
            {mainData.title}
          </h3>
          <p className="main-texts-color main-text-instruction">
            {mainData.instruction}
          </p>
        </div>
        <div className="fields-form">
          {mainData.mainform?.mainFormInputs?.map((field, key) => {
            const fieldText = field.text
            return field.type !== "state" ? (
              <Form.Group className="field" key={key}>
                <Form.Label
                  className="select-label main-texts-color labels-text-format"
                  htmlFor={`emailInput-mainForm${key}`}
                >
                  {field.text}*
                </Form.Label>
                <Form.Control
                  id={`emailInput-mainForm${key}`}
                  type={"text"}
                  placeholder={field.placeholder}
                  name={
                    field.text === "name"
                      ? "userName"
                      : field.text === "email"
                      ? "emailUser"
                      : field.text
                  }
                  defaultValue={ 
                    field.text === 'name' 
                    ? dataUser.userName
                    : field.text === "email"
                    ? dataUser.emailUser 
                    : dataUser[fieldText] }
                  onChange={handleChange}
                  className="input-color main-form-inputs"
                  required
                />
              </Form.Group>
            ) : states.length > 0 ? (
              <Form.Group className={"field"} key={key}>
                <Form.Label className="select-label">
                  {field.label}*
                </Form.Label>
                <Form.Select
                  aria-label="DefaulValue"
                  required
                  name={field.type}
                  id="stateSelect-mainForm"
                  onChange={handleChange}
                >
                  <option key={"vacio"} value={""}>
                    {field.placeholder}
                  </option>
                  {states.sort().map((estate) => (
                    <option key={estate} value={estate}>
                      {estate}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group className="field" key={key}>
                <Form.Label className="select-label">
                  {field.label}*
                </Form.Label>
                <Form.Control
                  id="emailInput-mainForm"
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.type}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            );
          })}
        </div>
        <Form.Group
          style={{ textAlign: "justify" }}
          className="field select-styles-form terms-and-cond-input"
          controlId="conditions"
        >
          <Form.Check
            name="conditions"
            onClick={handleTerms}
            required
            label={
              <a
                target={"_blank"}
                className="links-checkboxes-color"
                rel={"noreferrer"}
                href={mainData.termsAndConditionsURL}
              >
                Terms and Conditions
              </a>
            }
          />
        </Form.Group>
        <Form.Group className="main-find-btn-container"></Form.Group>
        {showLoadSpin ? loading("spinner-containerB") : null}
      </Form>
      {renderListSelectSection()}
      </div>
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'mainForm':
        return renderMainFormSection(title,instructions,mainData,error)
      case 'emailForm':
        return <ManualEmailForm
        dataUser={dataUser}
        mainData={mainData}
        setActiveSection={setActiveSection}
        setDataUser={setDataUser}
        backendURLBase={backendURLBase}
        endpoints={endpoints}
        clientId={clientId}
        setEmailData={setEmailData}
      />;

      case 'emailPreview':
        return <EmailPreview
        dataUser={dataUser}
        emailData={emailData}
        setEmailData={setEmailData}
        setDataUser={setDataUser}
        clientId={clientId}
        endpoints={endpoints}
        backendURLBase={backendURLBase}
        backendURLBaseServices={backendURLBaseServices}
        mainData={mainData}
        allDataIn={allDataIn}
        setActiveSection={setActiveSection}
      />;
      case 'typ':
        return <ThankYou
        emailData={emailData}
        setDataUser={setDataUser}
        setEmailData={setEmailData}
        clientId={clientId}
        typData={typData}
        colors={colors}
        setActiveSection={setActiveSection}
      />;
  default: 
  return renderMainFormSection(title,instructions,mainData,error)
    }
  };
  return (
    <div className={"contenedor main-form-flex-container"}>
      <div className={"form-container"} >
        {renderSection()}
      </div>
    </div>
  );
};
export default MainForm;