"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainForm from "./components/MainForm";
import LoadingMainForm from "./components/LoadingMainForm";
import { fetchMainContent } from "./assets/petitions/fetchMainContent";
import { fetchRepresentatives } from "./assets/petitions/fetchRepresentatives";

function Home() {
  const [emailData, setEmailData] = useState({
    userName: "",
  });
  const [dataUser, setDataUser] = useState({});
  const [backendURLBase] = useState(`${process.env.NEXT_PUBLIC_URL}`);
  const [backendURLBaseServices] = useState(
    `${process.env.NEXT_PUBLIC_URL_SERVICES}`
  );
  const [id] = useState(
    `${process.env.NEXT_PUBLIC_CAMPAING_ID}` || "673fdec9b1590b18f3f273bb"
  );
  const campaignType = "AP";
  const [clientId] = useState(`${process.env.NEXT_PUBLIC_CLIENT_ID}`);
  const [endpoints] = useState({
    toSendBatchEmails: "/email-batch/",
    toGetRepresentativesPerStates: "/representatives-state/",
    toGetRepresentativesPerParty: "/representatives-party/",
    toGetAllRepresentatives: "/all-representatives/",
    toGetRepresentativesByCp: "/find-mp-demo/",
    toSaveLeads: "/leads/",
    toGetMainData: "/main/",
  });
  const [err,setErr]=useState(false)
  const [emails, setEmails] = useState([
    {
      name:'test',
      contact:'adan.mijangos@touchpointmarketing.mx'}, 
    {
      name:'tests',
      contact:'adan.mijangos@touchpointmarketing.mx'
    }]);
  const [states, setStates] = useState([]);
  const [mainData, setMainData] = useState({});
  const [typData, setTypData] = useState({
    thankYouMessage: "Please enter a thank you message on the dashboard",
    secondThankYouMessage: "Please enter fill this field in the dashboard",
    repeatButtonTyp: "Please fill in this field on the dashboard",
  });
  const [loading, setLoading] = useState(true);
  const [allDataIn, setAllDataIn] = useState([]);
  const [colors, setColors] = useState({});
  const getInitialState = async (backendURLBase,id,clientId, campaignType) => { 
    const initialState = await fetchMainContent(backendURLBase,id,clientId, campaignType)
    const getRepresentatives = await fetchRepresentatives(backendURLBase,endpoints,clientId, setEmails)
    if (initialState === false || getRepresentatives === false) {
      return setErr(true)
    }
    const pageData = initialState?.data[0]
    if(initialState.data?.length > 0 ) {
      const{mainform, emailform, emailPreview} = pageData
      setMainData({mainform, emailform, emailPreview})
      setColors(pageData.style)
      setTypData(pageData.ty)
      setLoading(false)
    }
   }
  useEffect(() => {
    getInitialState(backendURLBase,id,clientId, campaignType)
   }, []);
   useEffect(() => {
     if (colors && Object.keys(colors).length !== 0) {
       // Verifica que colors no sea undefined y no esté vacío
       document.documentElement.style.setProperty(
         "--main-bg-color",
         colors.backgroundColor
       );
       document.documentElement.style.setProperty(
         "--main-texts-color",
         colors.textColor
       );
       document.documentElement.style.setProperty(
         "--main-inputs-bg-color",
         colors.inputBackground
       );
       document.documentElement.style.setProperty(
         "--main-option-text-and-border-color",
         colors.inputTextColor
       );
       document.documentElement.style.setProperty(
         "--links-checkbox-somebtns-color",
         colors.linkColor
       );
       document.documentElement.style.setProperty(
         "--primary-btn-bg-color",
         colors.buttonColor
       );
       document.documentElement.style.setProperty(
         "--primary-btn-font-color",
         colors.buttonTextColor
       );
       document.documentElement.style.setProperty(
         "--back-btns-bg-color",
         colors.buttonBColor
       );
       document.documentElement.style.setProperty(
         "--back-btns-font-color",
         colors.buttonBTextColor
       );
     }
   }, [colors]);
  return (
    <>
    {err && (<h1>Error</h1>)}
      {loading && <LoadingMainForm cl={"spinner-container"} />}
      {!loading && (
        <MainForm
          emails={emails}
          setEmailData={setEmailData}
          emailData={emailData}
          dataUser={dataUser}
          setDataUser={setDataUser}
          clientId={clientId}
          states={states}
          endpoints={endpoints}
          typData={typData}
          mainData={mainData}
          backendURLBase={backendURLBase}
          backendURLBaseServices={backendURLBaseServices}
          allDataIn={allDataIn}
          setAllDataIn={setAllDataIn}
          colors={colors}
        />
      )}
    </>
  );
}
export default Home;
