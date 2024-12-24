const fetchRepresentatives = async (
  backendURLBase,
  endpoints,
  clientId,
  setEmails
) => {
  console.log("fetchReps");
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const datos = await fetch(
    `${backendURLBase}${endpoints.toGetAllRepresentatives}?clientId=${clientId}`,
    requestOptions
  );
  const response = await datos.json();
  setEmails(response.data);
  return true;
};

export { fetchRepresentatives };
