const fetchRepresentatives = async (backendURLBaseServices,endpoints,clientId, postcode, setMp, setSenator) => {
    //const datos = await fetchData(petitionMethod, backendURLBase, endpoint, clientId, params)
    console.log('fetchReps')
    const requestOptions = {
        method: "GET",
        redirect: 'follow',
    }
    const datos = await fetch( `${backendURLBaseServices}${endpoints.toGetAllRepresentatives}?clientId=${clientId}`,requestOptions)
    const response =  await datos.json() 

    return true
}


export{
    fetchRepresentatives
}
