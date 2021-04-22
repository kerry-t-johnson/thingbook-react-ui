import { parse } from "fecha";

export function apiEndpoint(path, query = {}) {
    let url = new URL(decodeURIComponent(path), process.env.REACT_APP_API_URI).href;

    let querySeparator = '?';
    for (const [key, value] in query) {
        url = `${url}${querySeparator}${key}=${value}`;
        querySeparator = '&';
    }

    return url;
}

export function fetchJson(callback, path, query = {}) {
    const url = apiEndpoint(path, query);

    fetch(url).then(response => response.json()).then(callback);
}

const _intl_dateformat = new Intl.DateTimeFormat('en-US');
const _intl_datetimeformat = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
});

export function formatDate(dateStringOrObject) {
    try {
        const dateObject = typeof dateStringOrObject === 'string' ? new Date(dateStringOrObject) : dateStringOrObject;

        return _intl_dateformat.format(dateObject);
    }
    catch (error) {
        console.log(error);
        return 'Unknown';
    }
}

export function formatDateTime(dateTimeStringOrObject) {
    console.log(typeof dateTimeStringOrObject);
    try {
        const dateObject = (typeof dateTimeStringOrObject === 'string') ? parse(dateTimeStringOrObject, 'isoDateTime') : dateTimeStringOrObject;

        return _intl_datetimeformat.format(dateObject);
    }
    catch (error) {
        console.log(error);
        return 'Unknown';
    }
}
