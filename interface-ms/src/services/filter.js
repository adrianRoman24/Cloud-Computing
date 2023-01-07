const addFiltersToURL = (url, payload) => {
    url += '?';
    Object.keys(payload).forEach(key => {
        if([null, '', undefined].includes(payload[key])) {
            return;
        }

        url += key + '=' + payload[key] + '&';
    });


    if(url.slice(-1) === '&') {
        url = url.slice(0, -1)
    }

    return url;
};

export default {
    addFiltersToURL,
};