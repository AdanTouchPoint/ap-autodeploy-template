const fetchMainContent = async (backendURLBase,id,clientId, campaignType) => {
    const requestOptions = {
        method: "GET",
        redirect: 'follow',
    }
    const pageData = await fetch(`${backendURLBase}/campaignContentId?clientId=${clientId}&id=${id}&type=${campaignType}`)
    if (pageData.ok === false) {
        return false
    }
    const data = await pageData.json()
    return data 
}

export {
    fetchMainContent
}
