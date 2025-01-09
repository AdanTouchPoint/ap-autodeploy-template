import { fetchData } from "./fetchData";
const fetchLeads = (
  successResponse,
  backendURLBase,
  endpoints,
  clientId,
  dataUser,
  emailData,
  emailMessage = '',
  leadType
) => {
  fetchData(
    "POST",
    backendURLBase,
    endpoints.toSaveLeads,
    clientId,
    `&names=${dataUser.userName ? dataUser.userName : "NA"}&postalcode=${
      dataUser.postcode ? dataUser.postcode : "NA"
    }&contact=${
      dataUser?.emailUser ? dataUser.emailUser : "NA"
    }&representative=${emailData?.name ? emailData?.name : "NA"}&emailMessage=${
      emailMessage ? JSON.stringify(emailMessage) : "NA"
    }&sended=${successResponse}&subject=${
      dataUser.subject ? dataUser.subject : "NA"
    }&city=${dataUser.city ? dataUser.city : "NA"}&party=${
      dataUser.party ? dataUser.party : "NA"
    }&type${leadType}`
  );
};

const fetchAllLeads = async (
  petitionMethod,
  backendURLBase,
  endpoint,
  clientId,
  setLeads
) => {
  const leads = await fetchData(
    petitionMethod,
    backendURLBase,
    endpoint,
    clientId
  );
  const data = leads.data;
  setLeads(data);
};

export { fetchLeads, fetchAllLeads };
